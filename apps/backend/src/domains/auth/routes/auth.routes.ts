import express from 'express';

import { isAuthenticated } from '../../../infrastructure/middleware/isAuthenticated';
import { login, logout, me, register } from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', isAuthenticated, logout);
router.get('/me', isAuthenticated, me);

export default router;
