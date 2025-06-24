import { Link, useNavigate } from '@tanstack/react-router';
import { useLogout } from '../../hooks/useLogout.ts';
import { useRoleCheck } from '../../hooks/useRoleCheck.ts';
import { useAuthStore } from '../../stores/authStore.ts';

export const Navbar = () => {
  const { isAuthenticated, user, setUser, toggleAuth } = useAuthStore();
  const { isAdmin, canManageShows } = useRoleCheck();
  const navigate = useNavigate();

  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutateAsync().then(() => {
      setUser(null);
      toggleAuth(false);
      navigate({ to: '/' });
    });
  };

  const getRoleBadge = () => {
    if (!user) return null;

    const roleColors = {
      admin: 'bg-red-600',
      actor: 'bg-purple-600',
      spectator: 'bg-blue-600',
      guest: 'bg-gray-600',
    };

    return (
      <span
        className={`px-2 py-1 text-xs rounded ${roleColors[user.role]} text-white`}
      >
        {user.role.toUpperCase()}
      </span>
    );
  };

  return (
    <nav className="flex justify-between items-center py-2.5 px-5 bg-black text-white border-b border-gray-700">
      {/* Navigation */}
      <div className="flex items-center gap-5">
        <Link to="/" className="text-white no-underline font-bold">
          InterAct
        </Link>

        <div className="flex gap-5 pr-5">
          <Link to="/about" className="text-white no-underline">
            À propos
          </Link>
          <Link to="/shows" className="text-white no-underline">
            Spectacles
          </Link>

          {/* Navigation spécifique aux rôles */}
          {canManageShows && (
            <Link to="/dashboard" className="text-white no-underline">
              Dashboard
            </Link>
          )}
          {isAdmin && (
            <Link to="/admin" className="text-white no-underline">
              Administration
            </Link>
          )}
        </div>
      </div>

      {/* Auth section */}
      <div className="flex items-center gap-2.5">
        {isAuthenticated ? (
          <>
            <div className="flex items-center gap-2">
              <span>
                Bonjour <strong>{user?.username}</strong>
              </span>
              {getRoleBadge()}
            </div>
            <Link to="/profil" className="text-blue-300 no-underline">
              Mon profil
            </Link>
            <button
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className={`py-2 px-4 text-white border-none rounded ${
                logoutMutation.isPending
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-red-600 cursor-pointer'
              }`}
            >
              {logoutMutation.isPending ? 'Déconnexion...' : 'Se déconnecter'}
            </button>
          </>
        ) : (
          <div className="flex gap-2.5">
            <Link
              to="/login"
              className="py-2 px-4 bg-blue-600 !text-white no-underline rounded"
            >
              Se connecter
            </Link>
            <Link
              to="/register"
              className="py-2 px-4 bg-blue-600 !text-white no-underline rounded"
            >
              S'inscrire
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
