const Class = require('../models/Class')
const User = require('../models/User')
const Course = require('../models/Course')

module.exports = {
    async index(req, res){
        try {
            const classes = await Class.findAll();
            return res.json(classes);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    },

    async store(req, res){
        try {
            const { semester, teacher_id, course_id } = req.body;

            // Verificar se todos os campos obrigatórios foram passados
            if(!semester || !teacher_id || !course_id)
                return res.status(400).json({error: 'Insira todos os campos'});

            const user = await User.findByPk(teacher_id);// Verificar se o professor existe
            const course = await Course.findByPk(course_id);// Verificar se o curso existe
            
            if(!user)
                return res.status(400).json({error: 'Professor não encontrado'});

            if(!course)
                return res.status(400).json({error: 'Curso não encontrado'});

            // Cria o curso
            const newClass = await Class.create({
                semester, teacher_id, course_id
            })

            return res.json({message: "Turma criada", class: newClass});
        } catch (error) {
            return res.status(500).json({error: error.message, errormessage: error + ""});
        }
    },

    async update(req, res) {
        try {
            const { class_id } = req.params;
            const { semester, teacher_id, course_id } = req.body;

            // Verificar se todos os campos obrigatórios foram passados
            if(!semester || !teacher_id || !course_id)
                return res.status(400).json({error: 'Insira todos os campos'});

            const updateClass = await Class.findByPk(class_id);

            // Verificar se a turma existe
            if (!updateClass)
                return res.status(404).json({ error: 'Turma não encontrada' });

            const user = await User.findByPk(teacher_id);// Verificar se o professor existe
            const course = await Course.findByPk(course_id);// Verificar se o curso existe
            
            if(!user)
                return res.status(400).json({error: 'Professor não encontrado'});

            if(!course)
                return res.status(400).json({error: 'Curso não encontrado'});

            // Cria o curso
            await updateClass.update({
                semester, teacher_id, course_id
            })
            return res.json({ message: 'Turma atualizada com sucesso', updateClass });
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    },

    async delete(req, res){
        try {
            const { class_id }  = req.params;

            if(!class_id)
                return res.status(400).json({error: 'ID não encontrado'});

            const thisClass = await Class.findByPk(class_id);

            if(!thisClass)
                return res.status(400).json({error: "Turma não encontrada"})

            await thisClass.destroy();

            return res.status(200).json({message: "Turma apagada"})
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
}