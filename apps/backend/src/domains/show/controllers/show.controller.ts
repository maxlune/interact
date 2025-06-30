import { Request, RequestHandler, Response } from 'express';

import { CustomRequest } from '../../../types/express';
import { response } from '../../../utils/response';
import { CreateShow } from '../use-cases/create-show';
import { DeleteShow } from '../use-cases/delete-show';
import { GetLiveShows } from '../use-cases/get-live.shows';
import { GetMyShows } from '../use-cases/get-my-shows';
import { GetShowById } from '../use-cases/get-show-by-id';
import { GetShows } from '../use-cases/get-shows';
import { UpdateShow } from '../use-cases/update.show';

const createShowUseCase = new CreateShow();
const getShowsUseCase = new GetShows();
const getShowByIdUseCase = new GetShowById();
const getLiveShowsUseCase = new GetLiveShows();
const getMyShowsUseCase = new GetMyShows();
const updateShowUseCase = new UpdateShow();
const deleteShowUseCase = new DeleteShow();

export const createShow: RequestHandler = async (
  req: CustomRequest,
  res: Response,
) => {
  try {
    const { title, description, startDate, endDate } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      response(res, {
        statusCode: 401,
        message: 'Utilisateur non authentifié',
      });
      return;
    }

    const result = await createShowUseCase.execute({
      title,
      description,
      startDate,
      endDate,
      createdBy: userId,
    });

    response(res, {
      statusCode: 201,
      message: result.message,
      data: result,
    });
  } catch (error) {
    console.error('Erreur createShow:', error);
    response(res, {
      statusCode: 400,
      message:
        error instanceof Error
          ? error.message
          : 'Erreur lors de la création du spectacle',
    });
  }
};

export const getShows: RequestHandler = async (req: Request, res: Response) => {
  try {
    const shows = await getShowsUseCase.execute();

    response(res, {
      statusCode: 200,
      message: 'Spectacles récupérés avec succès',
      data: shows,
    });
  } catch (error) {
    console.error('Erreur getShows:', error);
    response(res, {
      statusCode: 500,
      message: 'Erreur lors de la récupération des spectacles',
    });
  }
};

export const getMyShows: RequestHandler = async (
  req: CustomRequest,
  res: Response,
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      response(res, {
        statusCode: 401,
        message: 'Utilisateur non authentifié',
      });
      return;
    }

    const myShows = await getMyShowsUseCase.execute(userId);

    response(res, {
      statusCode: 200,
      message: 'Mes spectacles récupérés avec succès',
      data: myShows,
    });
  } catch (error) {
    console.error('Erreur getMyShows:', error);
    response(res, {
      statusCode: 500,
      message: 'Erreur lors de la récupération de vos spectacles',
    });
  }
};

export const getShowById: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const show = await getShowByIdUseCase.execute(id);

    response(res, {
      statusCode: 200,
      message: 'Spectacle récupéré avec succès',
      data: show,
    });
  } catch (error) {
    console.error('Erreur getShowById:', error);
    response(res, {
      statusCode: 404,
      message:
        error instanceof Error
          ? error.message
          : 'Erreur lors de la récupération du spectacle',
    });
  }
};

export const getLiveShows: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const liveShows = await getLiveShowsUseCase.execute();

    response(res, {
      statusCode: 200,
      message: 'Spectacles en direct récupérés avec succès',
      data: liveShows,
    });
  } catch (error) {
    console.error('Erreur getLiveShows:', error);
    response(res, {
      statusCode: 500,
      message: 'Erreur lors de la récupération des spectacles en direct',
    });
  }
};

export const updateShow: RequestHandler = async (
  req: CustomRequest,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { title, description, startDate, endDate, status } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      response(res, {
        statusCode: 401,
        message: 'Utilisateur non authentifié',
      });
      return;
    }

    const result = await updateShowUseCase.execute(id, userId, {
      title,
      description,
      startDate,
      endDate,
      status,
    });

    response(res, {
      statusCode: 200,
      message: result.message,
      data: result,
    });
  } catch (error) {
    console.error('Erreur updateShow:', error);
    response(res, {
      statusCode: 400,
      message:
        error instanceof Error
          ? error.message
          : 'Erreur lors de la mise à jour du spectacle',
    });
  }
};

export const deleteShow: RequestHandler = async (
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

    const result = await deleteShowUseCase.execute(id, userId);

    response(res, {
      statusCode: 200,
      message: result.message,
    });
  } catch (error) {
    console.error('Erreur deleteShow:', error);
    response(res, {
      statusCode: 400,
      message:
        error instanceof Error
          ? error.message
          : 'Erreur lors de la suppression du spectacle',
    });
  }
};
