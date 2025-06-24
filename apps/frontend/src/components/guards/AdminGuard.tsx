import type { ReactNode } from 'react';
import { UserRole } from '../../types/IUser';
import { RoleGuard } from './RoleGuard';

interface AdminGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const AdminGuard: React.FC<AdminGuardProps> = ({
  children,
  fallback,
}) => {
  return (
    <RoleGuard allowedRoles={[UserRole.ADMIN]} fallback={fallback}>
      {children}
    </RoleGuard>
  );
};
