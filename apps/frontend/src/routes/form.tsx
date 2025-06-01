import { useForm } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { z } from 'zod';

const schema = z.object({
  username: z
    .string()
    .min(3, "Le nom d'utilisateur doit avoir au moins 3 caractères"),
  email: z.string().email("L'email doit être valide"),
});

export const Route = createFileRoute('/form')({
  component: FormPage,
});

function FormPage() {
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');

  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
    },
    onSubmit: async ({ value }) => {
      console.log('Formulaire soumis avec les valeurs:', value);

      try {
        setSuccess(
          `Formulaire soumis ! Username: ${value.username}, Email: ${value.email}`,
        );
        setError('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
        setSuccess('');
      }
    },
    validators: {
      onChange: schema,
    },
  });

  return (
    <div>
      <h1>Test Formulaire avec Zod</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="username">
          {(field) => (
            <div>
              <label>Nom d'utilisateur : </label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors && (
                <p style={{ color: 'red' }}>
                  {field.state.meta.errors
                    .map((err) => err?.message)
                    .join(', ')}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <div>
              <label>Email : </label>
              <input
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors && (
                <p style={{ color: 'red' }}>
                  {field.state.meta.errors
                    .map((err) => err?.message)
                    .join(', ')}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <button type="submit">Soumettre</button>
      </form>

      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Section debug avec Subscribe pour temps réel */}
      <h3>States :</h3>
      <form.Subscribe>
        {(state) => (
          <>
            <p>
              <strong>state.values :</strong>
            </p>
            {JSON.stringify(state.values, null, 2)}
            <p>
              <strong>state.errors :</strong>
            </p>
            {JSON.stringify(state.errors, null, 2)}
            <p>
              <strong>state.isValid :</strong>{' '}
              {state.isValid ? 'TRUE' : 'FALSE'}
            </p>
            <p>
              <strong>state.canSubmit :</strong>{' '}
              {state.canSubmit ? 'TRUE' : 'FALSE'}
            </p>
          </>
        )}
      </form.Subscribe>
    </div>
  );
}
