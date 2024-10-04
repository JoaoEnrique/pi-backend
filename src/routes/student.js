import express from 'express';
import StudentController from '../controllers/StudentController.js';
import studentValidator from '../middlewares/studentValidator.js';
import uploadFile from '../middlewares/uploadFile.js';
const router = express.Router();

router.get('/', StudentController.index);
router.post('/store', studentValidator, StudentController.store);
router.post('/store-by-file', uploadFile.single('file'), StudentController.storeByFile);
router.delete('/delete/:user_id', StudentController.delete);
router.put('/update/:user_id', studentValidator, StudentController.update);

export default router;