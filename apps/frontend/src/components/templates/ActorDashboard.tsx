import { ActorGuard } from '../guards/ActorGuard';

export const ActorDashboard = () => {
  return (
    <ActorGuard
      fallback={<div>Vous devez être acteur pour accéder à cette page.</div>}
    >
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard Acteur</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mes spectacles */}
          <div className="p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-4">Mes Spectacles</h2>
            <p className="mb-4">Spectacles auxquels vous participez</p>
            <div className="space-y-2">
              <div className="p-3 rounded">
                <div className="font-medium">Roméo et Juliette</div>
                <div className="text-sm">En cours - 15 participants</div>
              </div>
              <div className="p-3 rounded">
                <div className="font-medium">Hamlet</div>
                <div className="text-sm">Prévu - 23 participants</div>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-4">Mes Questions</h2>
            <p className="mb-4">Questions que vous avez créées</p>
            <button className="bg-blue-600 px-4 py-2 rounded mb-4">
              Créer une question
            </button>
            <div>12 questions créées</div>
          </div>

          {/* Votes en cours */}
          <div className="p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-4">Contrôle des Votes</h2>
            <p className="mb-4">Gérer les votes en temps réel</p>
            <div className="space-y-2">
              <button className="bg-green-600 px-4 py-2 rounded w-full">
                Démarrer un vote
              </button>
              <button className="bg-red-600 px-4 py-2 rounded w-full">
                Arrêter le vote
              </button>
            </div>
          </div>

          {/* Résultats */}
          <div className="p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-4">Résultats</h2>
            <p className="mb-4">Historique des votes et résultats</p>
            <button className="bg-purple-600 px-4 py-2 rounded">
              Voir l'historique
            </button>
          </div>
        </div>
      </div>
    </ActorGuard>
  );
};
