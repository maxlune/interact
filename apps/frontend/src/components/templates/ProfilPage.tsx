import { useCheckAuth } from '../../hooks/useCheckAuth.ts';
import { useAuthStore } from '../../stores/authStore.ts';

export const ProfilPage = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { data, isLoading, isError } = useCheckAuth();

  if (!isAuthenticated) {
    return (
      <>
        <h1>Mon Profil</h1>
        <p>Vous devez être connecté pour voir cette page.</p>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <h1>Mon Profil</h1>
        <p>Chargement...</p>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <h1>Mon Profil</h1>
        <p>Erreur lors du chargement du profil.</p>
      </>
    );
  }

  return (
    <>
      <h1>Mon Profil</h1>

      <div>
        <p>Nom d'utilisateur : {user?.username || data?.data?.username}</p>
      </div>
    </>
  );
};
