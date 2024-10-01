const Course = require('../models/Course')
const User = require('../models/User')

module.exports = {
    async index(req, res){
        try {
            const courses = await Course.findAll();
            return res.json(courses);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    },

    async store(req, res){
        try {
            const { teacher_id, name, period, is_annual, type_work } = req.body;

            // Verificar se todos os campos obrigatórios foram passados
            if(!teacher_id || !name || !period || !is_annual || !type_work)
                return res.status(400).json({error: 'Insira todos os campos'});

            // Verificar se o professor existe
            const user = await User.findByPk(teacher_id);

            if(!user)
                return res.status(400).json({error: 'Professor não encontrado'});

            // Cria o curso
            const course = await Course.create({
                teacher_id, name, period, type_work, is_annual
            })

            return res.json({message: "Curso criado", course});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    },

    async update(req, res) {
        try {
            const { course_id } = req.params;
            const { teacher_id, name, period, is_annual, type_work } = req.body;

            // Verificar se o ID do curso foi passado
            if (!course_id)
                return res.status(400).json({ error: 'ID do curso não encontrado' });

            // Buscar o curso no banco
            const course = await Course.findByPk(course_id);

            // Verificar se o curso existe
            if (!course)
                return res.status(404).json({ error: 'Curso não encontrado' });

            // Verificar se todos os campos obrigatórios foram passados
            if (!teacher_id || !name || !period || !is_annual || !type_work)
                return res.status(400).json({ error: 'Insira todos os campos' });

            // Verificar se o professor existe
            const user = await User.findByPk(teacher_id);

            if (!user)
                return res.status(400).json({ error: 'Professor não encontrado' });

            // Atualizar o curso
            await course.update({
                teacher_id, name, period, is_annual, type_work
            });

            return res.json({ message: 'Curso atualizado com sucesso', course });
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    },

    async delete(req, res){
        try {
            const { course_id }  = req.params;

            if(!course_id)
                return res.status(400).json({error: 'ID não encontrado'});

            const course = await Course.findByPk(course_id);

            if(!course)
                return res.status(400).json({error: "Curso não encontrado"})

            await course.destroy();

            return res.status(200).json({message: "Curso apagado"})
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
}