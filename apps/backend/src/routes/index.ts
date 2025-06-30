import express from 'express';

import authRoutes from '../domains/auth/routes/auth.routes';
import showRoutes from '../domains/show/routes/show.routes';
import adminRoutes from '../domains/users/routes/admin.routes';
import userRoutes from '../domains/users/routes/user.routes';
import voteRoutes from '../domains/vote/routes/vote.routes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/votes', voteRoutes);
router.use('/shows', showRoutes);

export default router;
