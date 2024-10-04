import express from 'express';
import CoordinatorController from '../controllers/CoordinatorController.js';
import userValidator from '../middlewares/userValidator.js'
const router = express.Router();

router.get('/', CoordinatorController.index);
router.post('/store', userValidator, CoordinatorController.store);
router.delete('/delete/:user_id', CoordinatorController.delete);
router.put('/update/:user_id', userValidator, CoordinatorController.update);

export default router;