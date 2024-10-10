import express, { Request, Response, NextFunction } from "express";
import StudentValidator from "../middlewares/StudentValidator";
import StudentController from "../controllers/StudentController";
import uploadFile from '../middlewares/uploadFile';

const router = express.Router();

router.post('/store-by-file', uploadFile.single('file'), async (req: Request, res: Response) => {
    await StudentController.storeByFile(req, res);
});

router.get('/', (req: Request, res: Response) => {
    StudentController.index(req, res);
});

router.post('/store', async (req: Request, res: Response, next: NextFunction) => {
    StudentValidator.validate(req, res, next);
}, async (req: Request, res: Response) => {
    await StudentController.store(req, res);
});

router.delete('/delete/:user_id', (req: Request, res: Response) => {
    StudentController.delete(req, res);
});

router.put('/update/:user_id', (req: Request, res: Response, next: NextFunction) => { 
    StudentValidator.validate(req, res, next);
}, async (req: Request, res: Response) => {
    StudentController.update(req, res);
});

export default router;