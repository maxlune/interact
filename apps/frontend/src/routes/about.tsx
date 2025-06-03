import { createFileRoute } from '@tanstack/react-router';
import { AboutPage } from '../components/templates/AboutPage.tsx';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  return <AboutPage />;
}
