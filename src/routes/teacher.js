const express = require('express');
const TeacherController = require('../controllers/TeacherController');
const router = express.Router();

router.get('/', TeacherController.index);
router.post('/store', TeacherController.store);
router.delete('/delete/:user_id', TeacherController.delete);
router.put('/update/:user_id', TeacherController.update);

module.exports = router;