import { API_URL } from '../api-url.const.ts';

export interface RegisterData {
  username: string;
  password: string;
  confirmPassword: string;
}

export const register = async (data: RegisterData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Erreur lors de l'inscription");
  }

  return result;
};
