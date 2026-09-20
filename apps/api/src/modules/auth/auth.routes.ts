import { Router, type IRouter } from 'express';
import { authController } from './auth.controller.js';
import { validate } from '../../middleware/validate.js';
import { requireAuth } from '../../middleware/auth.js';
import { RegisterSchema, LoginSchema } from '@thinkspace/shared';

export const authRouter: IRouter = Router();

authRouter.post('/register', validate(RegisterSchema), authController.register);
authRouter.post('/login', validate(LoginSchema), authController.login);
authRouter.post('/refresh', authController.refresh);
authRouter.post('/logout', authController.logout);
authRouter.get('/me', requireAuth, authController.getMe);
