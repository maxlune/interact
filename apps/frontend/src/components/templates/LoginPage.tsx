import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { useLogin } from '../../hooks/useLogin.ts';
import { useAuthStore } from '../../stores/authStore.ts';

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

export const LoginPage = () => {
  const loginMutation = useLogin();
  const { setUser, toggleAuth } = useAuthStore();

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      loginMutation.mutate(value, {
        onSuccess: (data) => {
          console.log('Connexion réussie :', data);
          if (data.data) {
            setUser({
              id: data.data.userId,
              username: data.data.name,
            });
            toggleAuth(true);
          }
          // TODO: Rediriger vers la page d'accueil
        },
        onError: (error) => {
          console.error('Erreur de connexion :', error);
        },
      });
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
                disabled={loginMutation.isPending}
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
                disabled={loginMutation.isPending}
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

        <form.Subscribe selector={(state) => [state.canSubmit]}>
          {([canSubmit]) => (
            <button
              type="submit"
              disabled={!canSubmit || loginMutation.isPending}
              style={{
                padding: '10px 20px',
                backgroundColor:
                  !canSubmit || loginMutation.isPending ? '#7b7b7b' : '#000000',
                color: 'white',
                border: 'none',
                cursor:
                  !canSubmit || loginMutation.isPending
                    ? 'not-allowed'
                    : 'pointer',
              }}
            >
              {loginMutation.isPending ? 'Connexion...' : 'Se connecter'}
            </button>
          )}
        </form.Subscribe>
      </form>

      {loginMutation.isSuccess && (
        <div style={{ color: '#039824' }}>Connexion réussie !</div>
      )}

      {loginMutation.isError && (
        <div style={{ color: '#b41626' }}>
          {loginMutation.error?.message || 'Erreur de connexion'}
        </div>
      )}
    </div>
  );
};
