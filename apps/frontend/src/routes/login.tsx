import { useForm } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { z } from 'zod';
import { AuthService } from '../api/auth/auth.service.ts';

const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Le nom d'utilisateur est requis")
    .min(3, "Le nom d'utilisateur doit avoir au moins 3 caractères"),
  password: z
    .string()
    .min(1, 'Le mot de passe est requis')
    .min(3, 'Le mot de passe doit avoir au moins 3 caractères'),
});

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      setError('');
      setSuccess('');

      try {
        const result = await AuthService.login(value);

        setSuccess(
          `Connexion réussie ! Bienvenue ${result.data?.name || value.username}`,
        );

        // Ici rediriger l'utilisateur
      } catch (err) {
        console.error('Erreur:', err);
        setError(err instanceof Error ? err.message : 'Erreur de connexion');
      } finally {
        setLoading(false);
      }
    },
    validators: {
      onChange: loginSchema,
    },
  });

  return (
    <div>
      <h1>Connexion</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="username">
          {(field) => (
            <div style={{ marginBottom: '15px' }}>
              <label>Nom d'utilisateur : </label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={loading}
              />
              {field.state.meta.errors && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {field.state.meta.errors
                    .map((err) => err?.message)
                    .join(', ')}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <div style={{ marginBottom: '15px' }}>
              <label>Mot de passe : </label>
              <input
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={loading}
              />
              {field.state.meta.errors && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {field.state.meta.errors
                    .map((err) => err?.message)
                    .join(', ')}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit]) => (
            <button
              type="submit"
              disabled={!canSubmit || loading}
              style={{
                padding: '10px 20px',
                backgroundColor: !canSubmit || loading ? '#458186' : '#000000',
                color: 'white',
                border: 'none',
                cursor: !canSubmit || loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          )}
        </form.Subscribe>
      </form>

      {/* Messages de succès/erreur */}
      {success && (
        <div
          style={{
            color: '#039824',
          }}
        >
          {success}
        </div>
      )}

      {error && (
        <div
          style={{
            color: '#b41626',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
