import { createFileRoute } from '@tanstack/react-router';
import { ShowsPage } from '../components/templates/ShowsPage.tsx';

export const Route = createFileRoute('/shows')({
  component: Shows,
});

function Shows() {
  return <ShowsPage />;
}
