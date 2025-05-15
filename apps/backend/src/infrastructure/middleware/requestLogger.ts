import { NextFunction, Request, Response } from 'express';

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.log(`[${req.method}] - ${req.path}`);
  next();
};
