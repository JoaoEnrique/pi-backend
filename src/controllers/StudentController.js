const Student = require('../models/Student');
const Class = require('../models/Class');
const StudentClass = require('../models/StudentClass');
const xlsx = require('xlsx');
const path = require('path');
const _ = require('lodash');
const fs = require('fs');

const file = path.resolve('src/file.xlsx');

class StudentController {
    async index(req, res){
        try {
            const users = await Student.findAll({
                where:{
                    user_type: "student"
                }
            });
            return res.json(users);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async store(req, res){
        try {
            const {  name, email, password, code } = req.validatedData;
            const user = await Student.create({
                name, email, password, user_type: "student", code
            })

            return res.json({message: "Aluno criado", user});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async storeByFile(req, res){
        try {
            // Certifique-se de que o arquivo foi enviado
            if (!req.file) 
                return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
            
    
            const wb = xlsx.readFile(req.file.path); // Utilize o caminho do arquivo enviado
            const ws = wb.Sheets["Sheet1"];
            const data = xlsx.utils.sheet_to_json(ws, { header: 1 }); // Captura os dados como matriz
    
            // Remove a primeira linha
            data.shift(); // Remove a primeira linha (cabeçalho)
            data.shift(); // Remove a segunda linha (cabeçalho)


            // Mapeia os dados restantes para um formato mais útil
            const students = data.map(row => {
                const formattedName = row[1].split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
                const nameParts = formattedName.split(' ');
                const firstName = nameParts[0]; // Primeiro nome
                const lastName = nameParts[nameParts.length - 1]; // Último sobrenome
                const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@fatec.sp.gov.br`;

                return {
                    ra: row[0].trim(),      // RA
                    name: formattedName,   // Nome
                    email: email,   // Email
                    password: email,   // Email
                    // p1: row[2],      // P1
                    // p2: row[3],      // P2
                    // p3: row[4],      // P3
                    // p4: row[5],      // P4
                    // average: row[6],      // Média
                };
            });

            let existingStudent = [];  //inscrições que já existem
            let existingStudentClass = []; //inscrições que já existem

            for (const row of students) {
                const email = row['email'];
                // Verifica se o email já existe
                let student = await Student.findOne({ where: { email } });

                if (student) {
                    existingStudent.push(student)
                } else{
                    student = await Student.create({
                        name: row['name'],
                        email: row['email'],
                        password: row['password'], // Defina uma senha padrão ou gere uma
                        user_type: "student",
                        code: row['ra']
                    });
                }

                if(req.body.class_id){
                    let thisClass = await Class.findByPk(req.body.class_id);
                    let student_class = await StudentClass.findOne({ 
                        where: {
                            class_id: req.body.class_id,
                            student_id: student.id
                        } 
                    });

                    if(!thisClass)
                        return res.status(400).json({ message: 'Essa turma não existe ou foi excluida' });

                    if(student_class){
                        existingStudentClass.push(student)
                    } else {
                        await StudentClass.create({
                            student_id: student.id, class_id: req.body.class_id, ra: row['ra']
                        });
                    }
                }
            }


            // Apagar o arquivo após a leitura
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error('Erro ao apagar o arquivo:', err);
                }
            });

            let message = "Alunos cadastrados";

            if(existingStudentClass.length == students.length)
                message = "Os alunos já estão cadastrados";

            return res.json({ message, existingStudentClass });
    
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }


    async update(req, res) {
        try {
            const { user_id } = req.params;
            const {  name, email, password, code } = req.validatedData;

            // Verificar se o ID do Aluno foi passado
            if (!user_id)
                return res.status(400).json({ error: 'ID do Aluno não encontrado' });

            // Buscar o Aluno no banco
            const user = await Student.findByPk(user_id);

            // Verificar se o Aluno existe
            if (!user)
                return res.status(404).json({ error: 'Aluno não encontrado' });

            // Atualizar o Aluno com os novos dados
            await user.update({
                name, email, password, code
            });

            return res.json({ message: 'Aluno atualizado com sucesso', user });
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }


    async delete(req, res){
        try {
            const { user_id }  = req.params;

            if(!user_id)
                return res.status(400).json({error: 'ID não encontrado'});

            const user = await Student.findByPk(user_id);

            if(!user)
                return res.status(400).json({error: "Aluno não encontrado"})

            await user.destroy();

            return res.status(200).json({message: "Aluno apagado"})
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
}

module.exports =  new StudentController();