import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '../components/templates/LoginPage';

export const Route = createFileRoute('/login')({
  component: Login,
});

function Login() {
  return <LoginPage />;
}
