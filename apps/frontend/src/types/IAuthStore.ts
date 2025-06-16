import { type IUser, UserRole } from './IUser.ts';

export type IAuthStore = {
  isAuthenticated: boolean;
  toggleAuth: (isAuthenticated: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  isAdmin: () => boolean;
  isActor: () => boolean;
  isSpectator: () => boolean;
};
