import { createFileRoute } from '@tanstack/react-router';
import { ActorDashboard } from '../components/templates/ActorDashboard';

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
});

function Dashboard() {
  return <ActorDashboard />;
}
