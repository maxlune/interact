import express from 'express';

import { isAuthenticated } from '../../../infrastructure/middleware/isAuthenticated';
import { requireActor } from '../../../infrastructure/middleware/requireRole';
import {
  closeVote,
  createQuestion,
  createVote,
  getActiveVotes,
  getVoteResults,
  startVote,
} from '../controllers/vote.controller';

const router = express.Router();

router.post('/questions', isAuthenticated, createQuestion);

router.post('/votes', isAuthenticated, requireActor, createVote);
router.patch('/votes/:id/start', isAuthenticated, requireActor, startVote);
router.patch('/votes/:id/close', isAuthenticated, requireActor, closeVote);
router.get('/votes/:id/results', getVoteResults);

router.get('/shows/:showId/votes/active', getActiveVotes);

export default router;
