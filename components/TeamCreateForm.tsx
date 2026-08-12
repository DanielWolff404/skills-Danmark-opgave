'use client';

import { FormEvent, useState } from 'react';
import { useCreateTeam } from '@/hooks/useCompetitionApi';

type TeamPayload = {
  team_id: number;
  class_id: number;
  team_number: number;
};

const initialForm: TeamPayload = {
  team_id: 22,
  class_id: 7,
  team_number: 4,
};

export default function TeamCreateForm() {
  const [form, setForm] = useState<TeamPayload>(initialForm);
  const [message, setMessage] = useState<string | null>(null);

  const mutation = useCreateTeam();

  const updateField = (field: keyof TeamPayload, value: string) => {
    setForm((current) => ({ ...current, [field]: Number(value) }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    mutation.mutate(form, {
      onSuccess: () => {
        setMessage('Team created successfully.');
        setForm(initialForm);
      },
    });
  };

  return (
    <section className="api-panel api-form-panel mt-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Teams API</p>
        <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Create team</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Add a team to an existing class.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <label className="api-label">
          Team ID
          <input
            type="number"
            min="1"
            required
            value={form.team_id}
            onChange={(event) => updateField('team_id', event.target.value)}
            className="api-input"
          />
        </label>

        <label className="api-label">
          Class ID
          <input
            type="number"
            min="1"
            required
            value={form.class_id}
            onChange={(event) => updateField('class_id', event.target.value)}
            className="api-input"
          />
        </label>

        <label className="api-label">
          Team number
          <input
            type="number"
            min="1"
            required
            value={form.team_number}
            onChange={(event) => updateField('team_number', event.target.value)}
            className="api-input"
          />
        </label>

        <div className="md:col-span-3">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="api-button"
          >
            {mutation.isPending ? 'Creating team...' : 'Create team'}
          </button>
        </div>
      </form>

      {message && <p className="mt-4 rounded-lg bg-green-100 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">{message}</p>}
      {mutation.error && <p className="mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-200">{mutation.error.message}</p>}
    </section>
  );
}
