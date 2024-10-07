const express = require('express');
const CoordinatorController = require('../controllers/CoordinatorController');
const userValidator = require('../middlewares/userValidator');
const router = express.Router();

router.get('/', CoordinatorController.index);
router.post('/store', userValidator, CoordinatorController.store);
router.delete('/delete/:user_id', CoordinatorController.delete);
router.put('/update/:user_id', userValidator, CoordinatorController.update);

module.exports = router;