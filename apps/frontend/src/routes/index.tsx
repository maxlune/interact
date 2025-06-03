import { createFileRoute } from '@tanstack/react-router';
import '../App.css';
import { HomePage } from '../components/templates/HomePage.tsx';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return <HomePage />;
}
