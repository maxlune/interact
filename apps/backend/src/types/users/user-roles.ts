export enum UserRole {
  ADMIN = 'admin',
  ACTOR = 'actor',
  SPECTATOR = 'spectator',
  GUEST = 'guest',
}

export interface UserWithRole {
  id: string;
  username: string;
  role: UserRole;
}
