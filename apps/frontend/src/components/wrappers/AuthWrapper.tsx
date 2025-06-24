import { type ReactNode, useEffect } from 'react';
import { useCheckAuth } from '../../hooks/useCheckAuth';
import { useAuthStore } from '../../stores/authStore';

type AuthWrapperProps = {
  children: ReactNode;
};

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { data, isError, error, isSuccess } = useCheckAuth();
  const { setUser, toggleAuth } = useAuthStore();

  useEffect(() => {
    if (isError) {
      setUser(null);
      toggleAuth(false);
    } else if (isSuccess && data) {
      setUser({
        id: data.userId,
        username: data.username,
        role: data.role,
      });
      toggleAuth(true);
    }
  }, [isError, data, isSuccess, setUser, toggleAuth, error]);

  return <>{children}</>;
};
