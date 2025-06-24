import type { ReactNode } from 'react';
import { UserRole } from '../../types/IUser';
import { RoleGuard } from './RoleGuard';

interface ActorGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const ActorGuard: React.FC<ActorGuardProps> = ({
  children,
  fallback,
}) => {
  return (
    <RoleGuard
      allowedRoles={[UserRole.ACTOR, UserRole.ADMIN]}
      fallback={fallback}
    >
      {children}
    </RoleGuard>
  );
};
