import express from 'express';

import authRoutes from '../domains/auth/routes/auth.routes';
import userRoutes from '../domains/users/routes/user.routes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;
