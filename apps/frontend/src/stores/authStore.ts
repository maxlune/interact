import { devtools } from 'zustand/middleware';
import { create } from 'zustand/react';

import type { IAuthStore } from '../types/IAuthStore.ts';
import type { IUser } from '../types/IUser.ts';

export const useAuthStore = create<IAuthStore>()(
  devtools(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user: IUser | null) => {
        set({ user }, false, 'setUser');
      },

      toggleAuth: (isAuthenticated: boolean) => {
        set({ isAuthenticated }, false, 'toggleAuth');
      },
    }),
    {
      name: 'auth-store',
    },
  ),
);
