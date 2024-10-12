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
const Class_1 = __importDefault(require("../models/Class"));
class ClassController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classes = yield Class_1.default.findAll();
                return res.json(classes);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { semester, teacher_id, course_id } = req.body;
                // Cria o curso
                const newClass = yield Class_1.default.create({
                    semester, teacher_id, course_id
                });
                return res.json({ message: "Turma criada", class: newClass });
            }
            catch (error) {
                return res.status(500).json({ error: error.message, errormessage: error + "" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { class_id } = req.params;
                const { semester, teacher_id, course_id } = req.body;
                const updateClass = yield Class_1.default.findByPk(class_id);
                // Verificar se a turma existe
                if (!updateClass)
                    return res.status(404).json({ error: 'Turma não encontrada' });
                // Cria o curso
                yield updateClass.update({
                    semester, teacher_id, course_id
                });
                return res.json({ message: 'Turma atualizada com sucesso', updateClass });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { class_id } = req.params;
                if (!class_id)
                    return res.status(400).json({ error: 'ID não encontrado' });
                const thisClass = yield Class_1.default.findByPk(class_id);
                if (!thisClass)
                    return res.status(400).json({ error: "Turma não encontrada" });
                yield thisClass.destroy();
                return res.status(200).json({ message: "Turma apagada" });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.default = new ClassController();
