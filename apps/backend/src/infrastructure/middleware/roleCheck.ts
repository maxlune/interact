import { NextFunction, Response } from 'express';

import { CustomRequest } from '../../types/express';
import { UserRole } from '../../types/users/user-roles';
import { response } from '../../utils/response';

export const requireRole = (allowedRoles: UserRole[]) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        response(res, { statusCode: 401, message: 'Authentication required' });
        return;
      }

      const { UserRepository } = await import(
        '../../repositories/user.repository'
      );
      const userRepo = new UserRepository();

      const user = await userRepo.getUserById(req.user.userId, {
        id: true,
        role: true,
      });

      if (!user || !user.role) {
        response(res, { statusCode: 403, message: 'User role not found' });
        return;
      }

      if (!allowedRoles.includes(user.role as UserRole)) {
        response(res, {
          statusCode: 403,
          message: `Access forbidden. Required roles: ${allowedRoles.join(', ')}`,
        });
        return;
      }

      req.user.role = user.role as UserRole;
      next();
    } catch (error) {
      console.error('Role check error:', error);
      response(res, { statusCode: 500, message: 'Internal server error' });
    }
  };
};

// Helpers pour les rôles spécifiques
export const requireAdmin = requireRole([UserRole.ADMIN]);
export const requireActor = requireRole([UserRole.ACTOR, UserRole.ADMIN]);
export const requireSpectator = requireRole([
  UserRole.SPECTATOR,
  UserRole.ACTOR,
  UserRole.ADMIN,
]);
export const requireAuthenticated = requireRole([
  UserRole.ADMIN,
  UserRole.ACTOR,
  UserRole.SPECTATOR,
]);
