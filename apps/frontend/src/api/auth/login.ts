import { API_URL } from '../api-url.const.ts';

export interface LoginData {
  username: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Erreur de connexion');
  }

  return result;
};
