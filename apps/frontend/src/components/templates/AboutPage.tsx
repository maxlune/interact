import { useRoleCheck } from '../../hooks/useRoleCheck.ts';
import { ActorDashboard } from './ActorDashboard.tsx';
import { AdminPage } from './AdminPage.tsx';

export const AboutPage = () => {
  const { isAuthenticated, isAdmin, isActor, userRole } = useRoleCheck();

  return (
    <>
      <h1>About</h1>
      {!isAuthenticated ? (
        <div>
          <p style={{ color: 'var(--test-var-color)' }}>Pas connecté</p>
        </div>
      ) : (
        <div>
          <p className="mb-4">
            Rôle actuel : <span className="font-bold">{userRole}</span>
          </p>
          {isAdmin && (
            <>
              <AdminPage />
            </>
          )}
          {isActor && (
            <>
              <ActorDashboard />
            </>
          )}
        </div>
      )}
    </>
  );
};
