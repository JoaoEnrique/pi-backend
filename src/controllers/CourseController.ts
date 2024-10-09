import { ModelStatic } from 'sequelize';
import Course from '../models/Course';
import { Request, Response } from 'express';

class CourseController {
    private model: ModelStatic<Course> = Course;

    async index(req: Request, res: Response): Promise<Response>{
        try {
            const courses = await this.model.findAll();
            return res.json(courses);
        } catch (error: any) {
            return res.status(500).json({error: error.message});
        }
    }

    async store(req: Request, res: Response): Promise<Response>{
        try {
            const { coordinator_id, name, period, is_annual, type_work } = req.body;

            // Cria o curso
            const course = await this.model.create({
                coordinator_id, name, period, type_work, is_annual
            })

            return res.json({message: "Curso criado", course});
        } catch (error: any) {
            return res.status(500).json({error: error.message});
        }
    }

    async update(req: Request, res: Response): Promise<Response>{
        try {
            const { course_id } = req.params;
            const { coordinator_id, name, period, is_annual, type_work } = req.body;
            const course = await this.model.findByPk(course_id);// Buscar o curso no banco

            // Verificar se o curso existe
            if (!course)
                return res.status(404).json({ error: 'Curso não encontrado' });

            // Atualizar o curso
            await course.update({
                coordinator_id, name, period, is_annual, type_work
            });

            return res.json({ message: 'Curso atualizado com sucesso', course });
        } catch (error: any) {
            return res.status(500).json({error: error.message});
        }
    }

    async delete(req: Request, res: Response): Promise<Response>{
        try {
            const { course_id }  = req.params;

            if(!course_id)
                return res.status(400).json({error: 'ID não encontrado'});

            const course = await this.model.findByPk(course_id);

            if(!course)
                return res.status(400).json({error: "Curso não encontrado"})

            await course.destroy();

            return res.status(200).json({message: "Curso apagado"})
        } catch (error: any) {
            return res.status(500).json({error: error.message});
        }
    }
}

export default new CourseController();