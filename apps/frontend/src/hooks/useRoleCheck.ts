import { useAuthStore } from '../stores/authStore';

export const useRoleCheck = () => {
  const { hasRole, isAdmin, isActor, isSpectator, isAuthenticated, user } =
    useAuthStore();

  return {
    hasRole,
    isAdmin: isAdmin(),
    isActor: isActor(),
    isSpectator: isSpectator(),
    isAuthenticated,
    userRole: user?.role,

    canManageShows: isAdmin() || isActor(),
    canVote: isSpectator() || isActor() || isAdmin(),
    canCreateQuestions: isActor() || isAdmin(),
    canManageUsers: isAdmin(),
  };
};
