import { Request, RequestHandler, Response } from 'express';

import { CreateUser } from '../use-cases/create-user';
import { GetAllUsers } from '../use-cases/get-all-users';

const getAllUsersUseCase = new GetAllUsers();
const createUserUseCase = new CreateUser();

export const getAllUsers: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const users = await getAllUsersUseCase.getAllUsers();
  res.json(users);
};

export const createUser: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const newUser = await createUserUseCase.createUser(req.body);
  res.status(201).json(newUser);
};
