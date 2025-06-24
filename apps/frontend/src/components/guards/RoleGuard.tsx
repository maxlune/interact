import type { ReactNode } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { UserRole } from '../../types/IUser';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  fallback?: ReactNode;
  requireAuth?: boolean;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  fallback = <div>Accès non autorisé</div>,
  requireAuth = true,
}) => {
  const { isAuthenticated, hasRole } = useAuthStore();

  if (requireAuth && !isAuthenticated) {
    return <>{fallback}</>;
  }

  if (!hasRole(allowedRoles)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
