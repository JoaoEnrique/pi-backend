"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Student_1 = __importDefault(require("../models/Student"));
const Class_1 = __importDefault(require("../models/Class"));
const StudentClass_1 = __importDefault(require("../models/StudentClass"));
const EmailController_1 = __importDefault(require("./EmailController"));
const xlsx_1 = __importDefault(require("xlsx"));
const fs_1 = __importDefault(require("fs"));
const PasswordHelper_1 = __importDefault(require("../helpers/PasswordHelper"));
class StudentController {
    constructor() {
        this.Student = Student_1.default;
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield Student_1.default.findAll({
                    where: {
                        user_type: "student"
                    }
                });
                return res.json(users);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, hashedPassword, password, code } = req.body;
                const user = yield Student_1.default.create({
                    name, email, password: hashedPassword, user_type: "student", code
                });
                EmailController_1.default.sendPasswordEmail(user, password);
                return res.json({ message: "Aluno criado", user });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    storeByFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Certifique-se de que o arquivo foi enviado
                if (!req.file)
                    return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
                const wb = xlsx_1.default.readFile(req.file.path); // Utilize o caminho do arquivo enviado
                const ws = wb.Sheets["Sheet1"];
                const data = xlsx_1.default.utils.sheet_to_json(ws, { header: 1 }); // Captura os dados como matriz
                // Remove a primeira e segunda linha (cabeçalho)
                data.shift();
                data.shift();
                // Mapeia os dados restantes para um formato mais útil
                const students = data.map((row) => {
                    const formattedName = row[1].split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
                    const nameParts = formattedName.split(' ');
                    const firstName = nameParts[0]; // Primeiro nome
                    const lastName = nameParts[nameParts.length - 1]; // Último sobrenome
                    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@fatec.sp.gov.br`;
                    const password = PasswordHelper_1.default.generateRandomPassword();
                    return {
                        ra: row[0].trim(), // RA
                        name: formattedName, // Nome
                        email: email, // Email
                        password: password, // Senha
                    };
                    // p1: row[2],         // P1
                    // p2: row[3],         // P2
                    // p3: row[4],         // P3
                    // p4: row[5],         // P4
                    // average: row[6],    // Média
                });
                let existingStudent = []; //inscrições que já existem
                let existingStudentClass = []; //inscrições que já existem
                for (const row of students) {
                    const email = row['email'];
                    // Verifica se o email já existe
                    let student = yield this.Student.findOne({ where: { email } });
                    if (student) {
                        existingStudent.push(student);
                    }
                    else {
                        const hashedPassword = yield PasswordHelper_1.default.encrypt(row['password']);
                        student = yield Student_1.default.create({
                            name: row['name'],
                            email: row['email'],
                            password: hashedPassword, // Defina uma senha padrão ou gere uma
                            user_type: "student",
                            code: row['ra']
                        });
                        EmailController_1.default.sendPasswordEmail(student, row['password']);
                    }
                    if (req.body.class_id) {
                        let thisClass = yield Class_1.default.findByPk(req.body.class_id);
                        let student_class = yield StudentClass_1.default.findOne({
                            where: {
                                class_id: req.body.class_id,
                                student_id: student.id
                            }
                        });
                        if (!thisClass)
                            return res.status(400).json({ message: 'Essa turma não existe ou foi excluida' });
                        if (student_class) {
                            existingStudentClass.push(student);
                        }
                        else {
                            yield StudentClass_1.default.create({
                                student_id: student.id, class_id: req.body.class_id, ra: row['ra']
                            });
                        }
                    }
                }
                // Apagar o arquivo após a leitura
                fs_1.default.unlink(req.file.path, (err) => {
                    if (err) {
                        console.error('Erro ao apagar o arquivo:', err);
                    }
                });
                let message = "Alunos cadastrados";
                if (existingStudentClass.length == students.length)
                    message = "Os alunos já estão cadastrados";
                return res.json({ message, existingStudentClass });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req.params;
                const { name, email, password, code } = req.body;
                // Verificar se o ID do Aluno foi passado
                if (!user_id)
                    return res.status(400).json({ error: 'ID do Aluno não encontrado' });
                // Buscar o Aluno no banco
                const user = yield Student_1.default.findByPk(user_id);
                // Verificar se o Aluno existe
                if (!user)
                    return res.status(404).json({ error: 'Aluno não encontrado' });
                // Atualizar o Aluno com os novos dados
                yield user.update({
                    name, email, password, code
                });
                return res.json({ message: 'Aluno atualizado com sucesso', user });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req.params;
                if (!user_id)
                    return res.status(400).json({ error: 'ID não encontrado' });
                const user = yield Student_1.default.findByPk(user_id);
                if (!user)
                    return res.status(400).json({ error: "Aluno não encontrado" });
                yield user.destroy();
                return res.status(200).json({ message: "Aluno apagado" });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.default = new StudentController();
