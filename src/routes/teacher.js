import express from 'express';
import TeacherController from '../controllers/TeacherController.js';
const router = express.Router();

router.get('/', TeacherController.index);
router.post('/store', TeacherController.store);
router.delete('/delete/:user_id', TeacherController.delete);
router.put('/update/:user_id', TeacherController.update);

export default router;