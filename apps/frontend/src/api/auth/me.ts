const API_URL = import.meta.env.VITE_API_URL;

export const getMe = async () => {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: 'GET',
    credentials: 'include',
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Non authentifié');
  }

  return result;
};
