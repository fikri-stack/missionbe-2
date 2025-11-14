import { Router } from 'express';
import { register, login, verifyEmail } from '../controllers/authController';
import { validateRegister, validateLogin, handleValidationErrors } from '../middlewares/validation';

const router = Router();

router.post('/register', validateRegister, handleValidationErrors, register);
router.post('/login', validateLogin, handleValidationErrors, login);
router.get('/verify-email', verifyEmail);

export default router;