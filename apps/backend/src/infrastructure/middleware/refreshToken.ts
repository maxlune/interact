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
    next();
    return;
  }

  try {
    if (!accessToken) {
      console.log('No access token, attempting refresh');
      const newAccessToken = await authService.refreshAccessToken(refreshToken);
      if (newAccessToken) {
        res.cookie('accessToken', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 15 * 60 * 1000
        });
        req.cookies.accessToken = newAccessToken;
      }
      next();
      return;
    }

    try {
      jwt.verify(accessToken, JWT_SECRET);
      console.log('Access token still valid');
      next();
      return;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        console.log('Access token expired, attempting refresh');
        const newAccessToken = await authService.refreshAccessToken(refreshToken);
        if (newAccessToken) {
          res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
          });
          req.cookies.accessToken = newAccessToken;
        }
      } else {
        console.log('Access token corrupted, clearing all tokens');
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
      }
      next();
      return;
    }
  } catch (error) {
    console.log('Error in refresh middleware:', error);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    next();
  }
};