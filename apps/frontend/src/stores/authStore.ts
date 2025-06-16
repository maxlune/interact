import { devtools } from 'zustand/middleware';
import { create } from 'zustand/react';

import type { IAuthStore } from '../types/IAuthStore.ts';
import { type IUser, UserRole } from '../types/IUser.ts';

export const useAuthStore = create<IAuthStore>()(
  devtools(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user: IUser | null) => {
        set({ user }, false, 'setUser');
      },

      toggleAuth: (isAuthenticated: boolean) => {
        set({ isAuthenticated }, false, 'toggleAuth');
      },
      hasRole: (roles: UserRole | UserRole[]) => {
        const { user } = get();
        if (!user) {
          return false;
        }

        const allowedRoles = Array.isArray(roles) ? roles : [roles];
        return allowedRoles.includes(user.role);
      },

      isAdmin: () => {
        const { user } = get();
        return user?.role === UserRole.ADMIN;
      },

      isActor: () => {
        const { user } = get();
        return user?.role === UserRole.ACTOR || user?.role === UserRole.ADMIN;
      },

      isSpectator: () => {
        const { user } = get();
        return (
          user?.role === UserRole.SPECTATOR ||
          user?.role === UserRole.ACTOR ||
          user?.role === UserRole.ADMIN
        );
      },
    }),
    {
      name: 'auth-store',
    },
  ),
);
