const express = require('express');
const router = express.Router();
const ClassController = require('../controllers/ClassController');

router.get('/', ClassController.index);
router.post('/store', ClassController.store);
router.delete('/delete/:class_id', ClassController.delete);
router.put('/update/:class_id', ClassController.update);

module.exports = router;