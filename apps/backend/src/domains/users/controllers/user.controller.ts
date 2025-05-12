import { Request, Response, RequestHandler } from 'express';
import { GetAllUsers } from "../use-cases/get-all-users";
import {CreateUser} from "../use-cases/create-user";

const getAllUsersUseCase = new GetAllUsers();
const createUserUseCase = new CreateUser();

export const getAllUsers: RequestHandler = async (req: Request, res: Response) => {
  const users = await getAllUsersUseCase.getAllUsers();
  res.json(users);
}

export const createUser: RequestHandler = async (req: Request, res: Response) => {
  const newUser = await createUserUseCase.createUser(req.body);
  if (newUser) {
    res.status(201).json(newUser);
  } else {
    res.status(400).json({ error: "Impossible de créer l'utilisateur" });
  }
}