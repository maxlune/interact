import type { IUser } from './IUser.ts';

export type IAuthStore = {
  isAuthenticated: boolean;
  toggleAuth: (isAuthenticated: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
};
