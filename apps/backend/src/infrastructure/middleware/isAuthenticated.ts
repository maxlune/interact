import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import env from '../../config/env';
import { CustomRequest } from '../../types/express';
import { response } from '../../utils/response';

const { JWT_SECRET } = env;

export const isAuthenticated = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): void => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    response(res, { statusCode: 403, message: 'Token missing' });
    return;
  }
  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    const { userId, name } = decoded as jwt.JwtPayload;

    req.user = { userId, name };
    console.table(decoded);

    next();
  } catch {
    response(res, { statusCode: 401, message: 'Unauthorized' });
  }
};
