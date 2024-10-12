import { Request, Response, NextFunction } from 'express';
import express from 'express';
import CourseController from '../controllers/CourseController';
import CourseValidator from '../middlewares/CourseValidator';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    CourseController.index(req, res);
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    CourseValidator.validate(req, res, next);
}, async (req: Request, res: Response) => {
    await CourseController.store(req, res);
});

router.get('/:course_id', (req: Request, res: Response) => {
    CourseController.find(req, res);
});

router.delete('/:course_id', (req: Request, res: Response) => {
    CourseController.delete(req, res);
});

router.put('/:course_id', (req: Request, res: Response, next: NextFunction) => { 
    CourseValidator.validate(req, res, next);
}, async (req: Request, res: Response) => {
    CourseController.update(req, res);
});

export default router;