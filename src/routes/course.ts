import { Request, Response, NextFunction } from 'express';
import express from 'express';
import CourseController from '../controllers/CourseController';
import CourseValidator from '../middlewares/courseValidator';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    CourseController.index(req, res);
});

router.post('/store', async (req: Request, res: Response, next: NextFunction) => {
    CourseValidator.validate(req, res, next);
}, async (req: Request, res: Response) => {
    await CourseController.store(req, res);
});

router.delete('/delete/:course_id', (req: Request, res: Response) => {
    CourseController.delete(req, res);
});

router.put('/update/:course_id', (req: Request, res: Response, next: NextFunction) => { 
    CourseValidator.validate(req, res, next);
}, async (req: Request, res: Response) => {
    CourseController.update(req, res);
});

export default router;