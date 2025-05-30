import { Request, RequestHandler, Response } from 'express';

import env from '../../../config/env';
import { CustomRequest } from '../../../types/express';
import { response } from '../../../utils/response';
import { AuthService } from '../services/auth.service';
import { Login } from '../use-cases/login';
import { Me } from '../use-cases/me';
import { Register } from '../use-cases/register';

const { NODE_ENV } = env;

const loginUseCase = new Login();
const registerUseCase = new Register();
const meUseCase = new Me();

export const login: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const result = await loginUseCase.execute({ username, password });

    res.cookie('refreshToken', result.tokens.refreshToken, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie('accessToken', result.tokens.accessToken, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
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

export const register: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { username, password, confirmPassword } = req.body;

    const result = await registerUseCase.execute({
      username,
      password,
      confirmPassword,
    });

    response(res, {
      statusCode: 201,
      message: 'User created successfully',
      data: { username: result.username },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Invalid username or password') {
        response(res, {
          statusCode: 400,
          message: 'Invalid username or password',
        });
        return;
      }

      if (error.message === 'Passwords do not match') {
        response(res, {
          statusCode: 400,
          message: 'Passwords do not match',
        });
        return;
      }

      if (error.message === 'Username already exists') {
        response(res, {
          statusCode: 409,
          message: 'Username already exists',
        });
        return;
      }
    }

    console.error(error);
    response(res, {
      statusCode: 500,
      message: 'Internal server error',
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const authService = new AuthService();
    await authService.invalidateRefreshToken(req.user.userId);

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    response(res, { statusCode: 200, message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    response(res, { statusCode: 500, message: 'Internal server error' });
  }
};

export const me: RequestHandler = async (req: CustomRequest, res: Response) => {
  try {
    const result = await meUseCase.execute(req.user.userId);
    response(res, { statusCode: 200, message: 'OK', data: result });
  } catch (error) {
    console.error(error);
    response(res, {
      statusCode: 500,
      message: 'Internal server error',
    });
  }
};
