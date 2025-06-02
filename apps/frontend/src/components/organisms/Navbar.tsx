import { Link, useNavigate } from '@tanstack/react-router';
import { useLogout } from '../../hooks/useLogout.ts';
import { useAuthStore } from '../../stores/authStore.ts';

export const Navbar = () => {
  const { isAuthenticated, user, setUser, toggleAuth } = useAuthStore();
  const navigate = useNavigate();

  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutateAsync().then(() => {
      setUser(null);
      toggleAuth(false);
      navigate({ to: '/' });
    });
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#000',
        color: 'white',
        borderBottom: '1px solid #333',
      }}
    >
      {/* Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link
          to="/"
          style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
        >
          InterAct
        </Link>

        <div style={{ display: 'flex', gap: '20px', paddingRight: '20px' }}>
          <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>
            À propos
          </Link>
        </div>
      </div>

      {/* Auth section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {isAuthenticated ? (
          <>
            <span>
              Bonjour <strong>{user?.username}</strong>
            </span>
            <button
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              style={{
                padding: '8px 16px',
                backgroundColor: logoutMutation.isPending ? '#999' : '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: logoutMutation.isPending ? 'not-allowed' : 'pointer',
              }}
            >
              {logoutMutation.isPending ? 'Déconnexion...' : 'Se déconnecter'}
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link
              to="/login"
              style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
              }}
            >
              Se connecter
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
