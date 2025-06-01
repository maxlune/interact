const API_URL = import.meta.env.VITE_API_URL;

export const logout = async () => {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Erreur de déconnexion');
  }

  return true;
};
