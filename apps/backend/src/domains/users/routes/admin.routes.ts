import express from 'express';

import { isAuthenticated } from '../../../infrastructure/middleware/isAuthenticated';
import { requireAdmin } from '../../../infrastructure/middleware/requireRole';
import { getAllUsersWithRole } from '../controllers/user.controller';

const router = express.Router();

router.get('/users', isAuthenticated, requireAdmin, getAllUsersWithRole);

export default router;
