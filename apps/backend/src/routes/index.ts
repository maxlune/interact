import express from 'express';

import authRoutes from '../domains/auth/routes/auth.routes';
import adminRoutes from '../domains/users/routes/admin.routes';
import userRoutes from '../domains/users/routes/user.routes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);

export default router;
