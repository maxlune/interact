import { Request, RequestHandler, Response } from 'express';

import env from '../../../config/env';
import { response } from '../../../utils/response';
import { Login } from '../use-cases/login';

const { NODE_ENV } = env;

const loginUseCase = new Login();

export const login: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const result = await loginUseCase.execute({ username, password });

    res.cookie('refreshToken', result.tokens.refreshToken, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
    });

    res.cookie('accessToken', result.tokens.accessToken, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
    });

    response(res, {
      statusCode: 200,
      message: 'Authentication successful',
      data: {
        userId: result.user.userId,
        name: result.user.username,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Authentication failed') {
      response(res, {
        statusCode: 401,
        message: 'Authentication failed',
      });
      return;
    }

    console.error(error);
    response(res, {
      statusCode: 500,
      message: 'Internal server error',
    });
  }
};
