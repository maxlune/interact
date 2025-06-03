import { createFileRoute } from '@tanstack/react-router';
import { ProfilPage } from '../components/templates/ProfilPage.tsx';

export const Route = createFileRoute('/profil')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProfilPage />;
}
