import { useMutation } from '@tanstack/react-query';

import { logout } from '../api/auth/logout.ts';

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    mutationKey: ['logout'],
  });
};
