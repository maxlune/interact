import express from 'express';

import { isAuthenticated } from '../../../infrastructure/middleware/isAuthenticated';
import { requireActor } from '../../../infrastructure/middleware/requireRole';
import {
  createShow,
  deleteShow,
  getLiveShows,
  getMyShows,
  getShowById,
  getShows,
  updateShow,
} from '../controllers/show.controller';

const router = express.Router();

router.get('/', getShows);
router.get('/live', getLiveShows);
router.get('/my', isAuthenticated, getMyShows);
router.get('/:id', getShowById);
// TODO : require admin ici ?
router.post('/', isAuthenticated, requireActor, createShow);
router.put('/:id', isAuthenticated, requireActor, updateShow);
router.delete('/:id', isAuthenticated, requireActor, deleteShow);

export default router;
