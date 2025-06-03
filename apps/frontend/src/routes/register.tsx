import { createFileRoute } from '@tanstack/react-router';
import { RegisterPage } from '../components/templates/RegisterPage';

export const Route = createFileRoute('/register')({
  component: Register,
});

function Register() {
  return <RegisterPage />;
}
