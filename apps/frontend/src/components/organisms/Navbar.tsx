import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useLogout } from '../../hooks/useLogout.ts';
import { useRoleCheck } from '../../hooks/useRoleCheck.ts';
import { useAuthStore } from '../../stores/authStore.ts';

export const Navbar = () => {
  const { isAuthenticated, user, setUser, toggleAuth } = useAuthStore();
  const { isAdmin, canManageShows } = useRoleCheck();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutateAsync().then(() => {
      setUser(null);
      toggleAuth(false);
      navigate({ to: '/' });
      setIsMobileMenuOpen(false); // Fermer le menu mobile après logout
    });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
    <nav className="border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          <div>
            <Link
              to="/"
              className="font-bold text-xl"
              onClick={closeMobileMenu}
            >
              InterAct
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/about"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium no-underline transition-colors"
              >
                À propos
              </Link>
              <Link
                to="/shows"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium no-underline transition-colors"
              >
                Spectacles
              </Link>

              {/* Navigation spécifique aux rôles */}
              {canManageShows && (
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium no-underline transition-colors"
                >
                  Dashboard
                </Link>
              )}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium no-underline transition-colors"
                >
                  Administration
                </Link>
              )}
            </div>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300 text-sm">
                      Bonjour{' '}
                      <strong className="text-white">{user?.username}</strong>
                    </span>
                    {getRoleBadge()}
                  </div>
                  <Link
                    to="/profil"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium no-underline transition-colors"
                  >
                    Mon profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      logoutMutation.isPending
                        ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                  >
                    {logoutMutation.isPending
                      ? 'Déconnexion...'
                      : 'Se déconnecter'}
                  </button>
                </>
              ) : (
                <div className="flex space-x-2">
                  <Link
                    to="/login"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium no-underline transition-colors"
                  >
                    Se connecter
                  </Link>
                  <Link
                    to="/register"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium no-underline transition-colors"
                  >
                    S'inscrire
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-gray-400">
              <span className="sr-only">Ouvrir le menu principal</span>
              {/* Burger icon */}
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-2 border-gray-300">
          {/* Mobile Navigation Links */}
          <Link
            to="/about"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium no-underline transition-colors"
            onClick={closeMobileMenu}
          >
            À propos
          </Link>
          <Link
            to="/shows"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium no-underline transition-colors"
            onClick={closeMobileMenu}
          >
            Spectacles
          </Link>

          {/* Navigation mobile spécifique aux rôles */}
          {canManageShows && (
            <Link
              to="/dashboard"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium no-underline transition-colors"
              onClick={closeMobileMenu}
            >
              Dashboard
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/admin"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium no-underline transition-colors"
              onClick={closeMobileMenu}
            >
              Administration
            </Link>
          )}

          {/* Mobile Auth Section */}
          <div className="pt-4 pb-3 border-t border-gray-700">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="px-3 py-2">
                  <div className="text-base font-medium text-white flex items-center gap-2">
                    {user?.username}
                    {getRoleBadge()}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    Connecté
                  </div>
                </div>
                <Link
                  to="/profil"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium no-underline transition-colors"
                  onClick={closeMobileMenu}
                >
                  Mon profil
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    logoutMutation.isPending
                      ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {logoutMutation.isPending
                    ? 'Déconnexion...'
                    : 'Se déconnecter'}
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium no-underline transition-colors text-center"
                  onClick={closeMobileMenu}
                >
                  Se connecter
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 hover:bg-green-700 text-white block px-3 py-2 rounded-md text-base font-medium no-underline transition-colors text-center"
                  onClick={closeMobileMenu}
                >
                  S'inscrire
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
