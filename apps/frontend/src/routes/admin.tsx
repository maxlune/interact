import { createFileRoute } from '@tanstack/react-router';
import { AdminPage } from '../components/templates/AdminPage';

export const Route = createFileRoute('/admin')({
  component: Admin,
});

function Admin() {
  return <AdminPage />;
}
