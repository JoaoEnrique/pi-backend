import express from 'express';
import ClassController from '../controllers/ClassController.js';
import classValidator from '../middlewares/classValidator.js'
const router = express.Router();

router.get('/', ClassController.index);
router.post('/store', classValidator, ClassController.store);
router.delete('/delete/:class_id', ClassController.delete);
router.put('/update/:class_id', classValidator, ClassController.update);

export default router;