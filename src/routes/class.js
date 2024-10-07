const express = require('express');
const ClassController = require('../controllers/ClassController');
const classValidator = require('../middlewares/classValidator');
const router = express.Router();

router.get('/', ClassController.index);
router.post('/store', classValidator, ClassController.store);
router.delete('/delete/:class_id', ClassController.delete);
router.put('/update/:class_id', classValidator, ClassController.update);

module.exports = router;