import { AdminGuard } from '../guards/AdminGuard';

export const AdminPage = () => {
  return (
    <AdminGuard
      fallback={
        <div>Vous devez être administrateur pour accéder à cette page.</div>
      }
    >
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Administration</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card Gestion des utilisateurs */}
          <div className="p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-4">
              Gestion des utilisateurs
            </h2>
            <p className="mb-4">
              Gérer les rôles et permissions des utilisateurs
            </p>
            <button className="bg-blue-600 px-4 py-2 rounded">
              Voir les utilisateurs
            </button>
          </div>

          {/* Card Gestion des spectacles */}
          <div className="p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-4">Spectacles</h2>
            <p className="mb-4">Créer et gérer les spectacles</p>
            <button className="bg-green-600 px-4 py-2 rounded">
              Gérer les spectacles
            </button>
          </div>

          {/* Card Actualités */}
          <div className="p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-4">Actualités</h2>
            <p className="mb-4">Publier et gérer les actualités du théâtre</p>
            <button className="bg-purple-600 px-4 py-2 rounded">
              Gérer les actualités
            </button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="mt-8 p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">42</div>
              <div>Utilisateurs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">8</div>
              <div>Spectacles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">156</div>
              <div>Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">1,234</div>
              <div>Votes</div>
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
};
