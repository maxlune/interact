import { useMutation } from '@tanstack/react-query';

import { login } from '../api/auth/login.ts';

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    mutationKey: ['login'],
    retry: 1,
    retryDelay: 1000,
  });
};
