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
        setMessage('Hold oprettet.');
        setForm(initialForm);
      },
    });
  };

  return (
    <section className="api-panel api-form-panel mt-8">
      <div className="mb-6 border-b border-slate-900/10 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">Teams API</p>
        <h2 className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">Opret hold</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Tilføj et hold til en eksisterende klasse.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <label className="api-label">
          Team ID
          <input
            aria-label="Team ID"
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
            aria-label="Class ID"
            type="number"
            min="1"
            required
            value={form.class_id}
            onChange={(event) => updateField('class_id', event.target.value)}
            className="api-input"
          />
        </label>

        <label className="api-label">
          Holdnummer
          <input
            aria-label="Team number"
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
            className="api-button w-full sm:w-auto"
          >
            {mutation.isPending ? 'Opretter hold...' : 'Opret hold'}
          </button>
        </div>
      </form>

      {message && <p role="status" className="mt-4 rounded-xl border border-emerald-900/10 bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p>}
      {mutation.error && <p role="alert" className="mt-4 rounded-xl border border-red-900/10 bg-red-50 p-3 text-sm text-red-800">{mutation.error.message}</p>}
    </section>
  );
}
