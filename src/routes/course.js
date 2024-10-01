const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/CourseController');

router.get('/', CourseController.index);
router.post('/store', CourseController.store);
router.delete('/delete/:course_id', CourseController.delete);
router.put('/update/:course_id', CourseController.update);

module.exports = router;