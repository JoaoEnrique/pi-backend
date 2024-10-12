import express, { Request, Response, NextFunction } from "express";
import ClassController from "../controllers/ClassController";
import ClassValidator  from "../middlewares/ClassValidator";

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    ClassController.index(req, res);
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    ClassValidator.validate(req, res, next);
}, async (req: Request, res: Response) => {
    await ClassController.store(req, res);
});

router.get('/:course_id', (req: Request, res: Response) => {
    ClassController.find(req, res);
});

router.delete('/:course_id', (req: Request, res: Response) => {
    ClassController.delete(req, res);
});

router.put('/:course_id', (req: Request, res: Response, next: NextFunction) => { 
    ClassValidator.validate(req, res, next);
}, async (req: Request, res: Response) => {
    ClassController.update(req, res);
});

export default router;