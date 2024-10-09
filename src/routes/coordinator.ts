import express, { Request, Response, NextFunction } from "express";
import CoordinatorController from "../controllers/CoordinatorController";
import UserValidator from "../middlewares/UserValidator";
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    CoordinatorController.index(req, res);
});

router.post('/store', async (req: Request, res: Response, next: NextFunction) => {
    UserValidator.validate(req, res, next);
}, async (req: Request, res: Response) => {
    await CoordinatorController.store(req, res);
});

router.delete('/delete/:user_id', (req: Request, res: Response) => {
    CoordinatorController.delete(req, res);
});

router.put('/update/:user_id', (req: Request, res: Response, next: NextFunction) => { 
    UserValidator.validate(req, res, next);
}, async (req: Request, res: Response) => {
    CoordinatorController.update(req, res);
});

export default router;