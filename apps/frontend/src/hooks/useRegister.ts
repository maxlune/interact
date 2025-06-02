import { useMutation } from '@tanstack/react-query';

import { register } from '../api/auth/register.ts';

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    mutationKey: ['register'],
    retry: 1,
    retryDelay: 1000,
  });
};
