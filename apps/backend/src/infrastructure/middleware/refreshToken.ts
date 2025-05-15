import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import env from '../../config/env';
import { AuthService } from '../../domains/auth/services/auth.service';

const authService = new AuthService();
const { JWT_SECRET } = env;

export const refreshTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { refreshToken, accessToken } = req.cookies;

  if (!refreshToken) {
    // return next();
    next();
    return;
  }

  try {
    try {
      if (accessToken) {
        jwt.verify(accessToken, JWT_SECRET);
        console.log('Access token still valid');

        next();
        return;
      }
    } catch {
      console.log('Access token expired, attempting refresh');
    }

    const newAccessToken = await authService.refreshAccessToken(refreshToken);
    if (newAccessToken) {
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      req.cookies.accessToken = newAccessToken;
    }
    next();
  } catch (error) {
    console.log('Error in refresh middleware:', error);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    console.error(error);
    next();
  }
};
