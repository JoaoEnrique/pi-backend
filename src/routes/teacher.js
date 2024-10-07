const express = require('express');
const TeacherController = require('../controllers/TeacherController');
const userValidator = require('../middlewares/userValidator');
const router = express.Router();

router.get('/', TeacherController.index);
router.post('/store', userValidator, TeacherController.store);
router.delete('/delete/:user_id', TeacherController.delete);
router.put('/update/:user_id', userValidator, TeacherController.update);

module.exports = router;