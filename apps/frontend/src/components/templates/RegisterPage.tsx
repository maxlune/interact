import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import { z } from 'zod';
import { useRegister } from '../../hooks/useRegister.ts';

const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, "Le nom d'utilisateur est requis")
      .min(3, "Le nom d'utilisateur doit avoir au moins 3 caractères"),
    password: z
      .string()
      .min(1, 'Le mot de passe est requis')
      .min(3, 'Le mot de passe doit avoir au moins 3 caractères'),
    confirmPassword: z
      .string()
      .min(1, 'La confirmation du mot de passe est requise'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

export const RegisterPage = () => {
  const registerMutation = useRegister();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      registerMutation.mutate(value, {
        onSuccess: (data) => {
          console.log('Inscription réussie :', data);
          navigate({ to: '/login' });
        },
        onError: (error) => {
          console.error("Erreur lors de l'inscription :", error);
        },
      });
    },
    validators: {
      onChange: registerSchema,
    },
  });

  return (
    <div>
      <h1>Inscription</h1>

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
                disabled={registerMutation.isPending}
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
                disabled={registerMutation.isPending}
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

        <form.Field name="confirmPassword">
          {(field) => (
            <div className="mb-4">
              <label>Confirmer le mot de passe : </label>
              <input
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={registerMutation.isPending}
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
              disabled={!canSubmit || registerMutation.isPending}
              className={`py-2.5 px-5 text-white border-none ${
                !canSubmit || registerMutation.isPending
                  ? 'bg-neutral-500 cursor-not-allowed'
                  : 'bg-green-600 cursor-pointer'
              }`}
            >
              {registerMutation.isPending ? 'Inscription...' : "S'inscrire"}
            </button>
          )}
        </form.Subscribe>
      </form>

      {registerMutation.isSuccess && (
        <div className="text-green-600">
          Inscription réussie ! Redirection vers la page de connexion...
        </div>
      )}

      {registerMutation.isError && (
        <div className="text-red-600">
          {registerMutation.error?.message || "Erreur lors de l'inscription"}
        </div>
      )}
    </div>
  );
};
