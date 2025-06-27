import { Request, RequestHandler, Response } from 'express';
import { Server } from 'socket.io';

import { CustomRequest } from '../../../types/express';
import { response } from '../../../utils/response';
import { CloseVote } from '../use-cases/close-vote';
import { CreateQuestion } from '../use-cases/create-question';
import { CreateVote } from '../use-cases/create-vote';
import { GetActiveVotes } from '../use-cases/get-active-votes';
import { GetVoteResults } from '../use-cases/get-vote-results';
import { StartVote } from '../use-cases/start-vote';

import { broadcastVoteClosed, broadcastVoteStarted } from './socket.controller';

const createQuestionUseCase = new CreateQuestion();
const createVoteUseCase = new CreateVote();
const startVoteUseCase = new StartVote();
const closeVoteUseCase = new CloseVote();
const getVoteResultsUseCase = new GetVoteResults();
const getActiveVotesUseCase = new GetActiveVotes();

// TODO Récupérer l'instance Socket.IO depuis app.ts
// TODO Pour l'instant import, mais idéalement il faudrait l'injecter
let io: Server;

export const setSocketIO = (socketIO: Server) => {
  io = socketIO;
};

export const createQuestion: RequestHandler = async (
  req: CustomRequest,
  res: Response,
) => {
  try {
    const { content, answers } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      response(res, {
        statusCode: 401,
        message: 'Utilisateur non authentifié',
      });
      return;
    }

    const result = await createQuestionUseCase.execute({
      content,
      answers,
      createdBy: userId,
    });

    response(res, {
      statusCode: 201,
      message: result.message,
      data: result,
    });
  } catch (error) {
    console.error('Erreur createQuestion:', error);
    response(res, {
      statusCode: 400,
      message:
        error instanceof Error
          ? error.message
          : 'Erreur lors de la création de la question',
    });
  }
};

export const createVote: RequestHandler = async (
  req: CustomRequest,
  res: Response,
) => {
  try {
    const { questionId, showId } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      response(res, {
        statusCode: 401,
        message: 'Utilisateur non authentifié',
      });
      return;
    }

    const result = await createVoteUseCase.execute({
      questionId,
      showId,
      createdBy: userId,
    });

    response(res, {
      statusCode: 201,
      message: result.message,
      data: result,
    });
  } catch (error) {
    console.error('Erreur createVote:', error);
    response(res, {
      statusCode: 400,
      message:
        error instanceof Error
          ? error.message
          : 'Erreur lors de la création du vote',
    });
  }
};

export const startVote: RequestHandler = async (
  req: CustomRequest,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      response(res, {
        statusCode: 401,
        message: 'Utilisateur non authentifié',
      });
      return;
    }

    const result = await startVoteUseCase.execute(id, userId);

    if (io) {
      broadcastVoteStarted(io, result.showId, {
        id: result.id,
        question: result.question,
        startedAt: result.startedAt,
      });
    }

    response(res, {
      statusCode: 200,
      message: result.message,
      data: result,
    });
  } catch (error) {
    console.error('Erreur startVote:', error);
    response(res, {
      statusCode: 400,
      message:
        error instanceof Error
          ? error.message
          : 'Erreur lors du démarrage du vote',
    });
  }
};

export const closeVote: RequestHandler = async (
  req: CustomRequest,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      response(res, {
        statusCode: 401,
        message: 'Utilisateur non authentifié',
      });
      return;
    }

    const result = await closeVoteUseCase.execute(id, userId);

    if (io) {
      broadcastVoteClosed(io, result.showId, result.id, result.finalResults);
    }

    response(res, {
      statusCode: 200,
      message: result.message,
      data: result,
    });
  } catch (error) {
    console.error('Erreur closeVote:', error);
    response(res, {
      statusCode: 400,
      message:
        error instanceof Error
          ? error.message
          : 'Erreur lors de la fermeture du vote',
    });
  }
};

export const getVoteResults: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const results = await getVoteResultsUseCase.execute(id);

    response(res, {
      statusCode: 200,
      message: 'Résultats récupérés avec succès',
      data: results,
    });
  } catch (error) {
    console.error('Erreur getVoteResults:', error);
    response(res, {
      statusCode: 404,
      message:
        error instanceof Error
          ? error.message
          : 'Erreur lors de la récupération des résultats',
    });
  }
};

export const getActiveVotes: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const { showId } = req.params;

    const activeVotes = await getActiveVotesUseCase.execute(showId);

    response(res, {
      statusCode: 200,
      message: 'Votes actifs récupérés avec succès',
      data: activeVotes,
    });
  } catch (error) {
    console.error('Erreur getActiveVotes:', error);
    response(res, {
      statusCode: 400,
      message:
        error instanceof Error
          ? error.message
          : 'Erreur lors de la récupération des votes actifs',
    });
  }
};
