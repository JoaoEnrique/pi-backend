import express from 'express';
import CourseController from '../controllers/CourseController.js';
import courseValidator from '../middlewares/courseValidator.js'
const router = express.Router();

router.get('/', CourseController.index);
router.post('/store', courseValidator, CourseController.store);
router.delete('/delete/:course_id', CourseController.delete);
router.put('/update/:course_id', courseValidator, CourseController.update);

export default router;