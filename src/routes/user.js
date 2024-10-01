const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.index);
router.post('/store', UserController.store);
router.delete('/delete/:user_id', UserController.delete);
router.put('/update/:user_id', UserController.update);

module.exports = router;