import express from 'express';
import authController from '@/controllers/authController';
import { validateRequest } from '@/middleware/requestValidation';
import { registerInputSchema } from '@/dto/authDto';

const router = express.Router();

router.post('/register', validateRequest(registerInputSchema), authController.register);
router.post('/login', authController.login);

export default router;
