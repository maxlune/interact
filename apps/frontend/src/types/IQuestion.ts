import type { IAnswer } from './IAnswer.ts';
import type { IUser } from './IUser.ts';

export interface IQuestion {
  id: string;
  content: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  answers: IAnswer[];
  creator?: IUser;
}
