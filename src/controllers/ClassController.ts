import Class  from '../models/Class';
import { Request, Response } from 'express';
import User from '../models/User';
import Course from '../models/Course';

class ClassController {
    async index(req: Request, res: Response){
        try {
            const classes = await Class.findAll({
                include: [
                    {
                        model: User,
                        as: 'teacher',
                        attributes: ['name']
                    },
                    {
                        model: Course,
                        as: 'course',
                        attributes: ['name', 'is_annual']
                    }
                ]
            });
            return res.json(classes);
        } catch (error: any) {
            return res.status(500).json({error: error.message});
        }
    }

    async store(req: Request, res: Response){
        try {
            const { semester, teacher_id, course_id } = req.body;

            // Cria o curso
            const newClass = await Class.create({
                semester, teacher_id, course_id
            })

            return res.json({message: "Turma criada", class: newClass});
        } catch (error: any) {
            return res.status(500).json({error: error.message, errormessage: error + ""});
        }
    }

    async find(req: Request, res: Response){
        try {
            const thisClass = await Class.findOne({
                where: { id: req.params.class_id },
                include: [
                    {
                        model: User,
                        as: 'teacher',
                        attributes: ['name']
                    },
                    {
                        model: Course,
                        as: 'course',
                        attributes: ['name', 'is_annual']
                    }
                ]
            });
            return res.json(thisClass);
        } catch (error: any) {
            return res.status(500).json({error: error.message});
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { class_id } = req.params;
            const { semester, teacher_id, course_id } = req.body;
            const updateClass = await Class.findByPk(class_id);

            // Verificar se a turma existe
            if (!updateClass)
                return res.status(404).json({ error: 'Turma não encontrada' });

            // Cria o curso
            await updateClass.update({
                semester, teacher_id, course_id
            })
            return res.json({ message: 'Turma atualizada com sucesso', updateClass });
        } catch (error: any) {
            return res.status(500).json({error: error.message});
        }
    }

    async delete(req: Request, res: Response){
        try {
            const { class_id }  = req.params;

            if(!class_id)
                return res.status(400).json({error: 'ID não encontrado'});

            const thisClass = await Class.findByPk(class_id);

            if(!thisClass)
                return res.status(400).json({error: "Turma não encontrada"})

            await thisClass.destroy();

            return res.status(200).json({message: "Turma apagada"})
        } catch (error: any) {
            return res.status(500).json({error: error.message});
        }
    }
}

export default new ClassController();