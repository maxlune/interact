export enum UserRole {
  ADMIN = 'admin',
  ACTOR = 'actor',
  SPECTATOR = 'spectator',
}

export interface UserWithRole {
  id: string;
  username: string;
  role: UserRole;
}

// For after
export type RolePermission = {
  [UserRole.ADMIN]: 'all';
  [UserRole.ACTOR]: 'manage_questions' | 'manage_votes' | 'view_results';
  [UserRole.SPECTATOR]: 'vote' | 'view_results' | 'manage_profile';
};
