export enum UserRole {
  ADMIN = 'admin',
  ACTOR = 'actor',
  SPECTATOR = 'spectator',
}

export interface IUser {
  id: string;
  username: string;
  role: UserRole;
}
