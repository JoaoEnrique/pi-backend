const express = require('express');
const CourseController = require('../controllers/CourseController');
const courseValidator = require('../middlewares/courseValidator');
const router = express.Router();

router.get('/', CourseController.index);
router.post('/store', courseValidator, CourseController.store);
router.delete('/delete/:course_id', CourseController.delete);
router.put('/update/:course_id', courseValidator, CourseController.update);

module.exports = router;