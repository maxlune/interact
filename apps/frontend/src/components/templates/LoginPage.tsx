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
          if (data.data) {
            setUser({
              id: data.data.userId,
              username: data.data.name,
              role: data.data.role,
            });
            toggleAuth(true);
          }
          window.location.href = '/';
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
            <div className="mb-4">
              <label>Nom d'utilisateur : </label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={loginMutation.isPending}
              />
              {field.state.meta.errors && (
                <p className="text-red-500 text-sm">
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
            <div className="mb-4">
              <label>Mot de passe : </label>
              <input
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={loginMutation.isPending}
              />
              {field.state.meta.errors && (
                <p className="text-red-500 text-sm">
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
              className={`py-2.5 px-5 text-white border-none ${
                !canSubmit || loginMutation.isPending
                  ? 'bg-neutral-500 cursor-not-allowed'
                  : 'bg-black cursor-pointer'
              }`}
            >
              {loginMutation.isPending ? 'Connexion...' : 'Se connecter'}
            </button>
          )}
        </form.Subscribe>
      </form>

      {loginMutation.isSuccess && (
        <div className="text-green-600">Connexion réussie !</div>
      )}

      {loginMutation.isError && (
        <div className="text-red-600">
          {loginMutation.error?.message || 'Erreur de connexion'}
        </div>
      )}
    </div>
  );
};
