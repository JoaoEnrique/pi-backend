import Student from '../models/Student.js';
import bcrypt from 'bcrypt';

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
            const {  name, email, password, code } = req.validatedData;
            const user = await Student.create({
                name, email, password, user_type: 'student', code
            })

            return res.json({message: "Aluno criado", user});
        } catch (error) {
            return res.status(500).json({error: error.message});
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

export default new StudentController();