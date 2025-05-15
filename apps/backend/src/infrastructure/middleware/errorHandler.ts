import { NextFunction, Request, Response } from 'express';

import { response } from '../../utils/response';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void => {
  console.error(err.stack);
  response(res, { statusCode: 500, message: 'Internal Server Error' });
};
