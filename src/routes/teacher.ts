import express, { NextFunction, Request, Response } from "express";
import TeacherController from "../controllers/TeacherController";
import UserValidator from "../middlewares/UserValidator";

const router = express.Router();


router.get('/', (req: Request, res: Response) => {
    TeacherController.index(req, res);
});

router.post('/store', async (req: Request, res: Response, next: NextFunction) => {
    UserValidator.validate(req, res, next);
}, async (req: Request, res: Response) => {
    await TeacherController.store(req, res);
});

router.post('/store-by-file', async (req: Request, res: Response, next: NextFunction) => {
    UserValidator.validate(req, res, next);
}, async (req: Request, res: Response) => {
    await TeacherController.store(req, res);
});

router.delete('/delete/:user_id', (req: Request, res: Response) => {
    TeacherController.delete(req, res);
});

router.put('/update/:user_id', (req: Request, res: Response, next: NextFunction) => { 
    UserValidator.validate(req, res, next);
}, async (req: Request, res: Response) => {
    TeacherController.update(req, res);
});


export default router;