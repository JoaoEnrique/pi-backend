import express from 'express';
import StudentController from '../controllers/StudentController.js';
import studentValidator from '../middlewares/studentValidator.js'
const router = express.Router();

router.get('/', StudentController.index);
router.post('/store', studentValidator, StudentController.store);
router.post('/store-by-file', StudentController.storeByFile);
router.delete('/delete/:user_id', StudentController.delete);
router.put('/update/:user_id', studentValidator, StudentController.update);

export default router;