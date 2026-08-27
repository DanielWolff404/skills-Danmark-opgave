'use client';

import { FormEvent, useState } from 'react';
import { useCreateResult } from '@/hooks/useCompetitionApi';

type ResultPayload = {
  team_id: number;
  station_id: number;
  seconds: number;
};

const initialForm: ResultPayload = {
  team_id: 1,
  station_id: 1,
  seconds: 60,
};

export default function ResultCreateForm() {
  const [form, setForm] = useState<ResultPayload>(initialForm);
  const [message, setMessage] = useState<string | null>(null);

  const mutation = useCreateResult();

  const updateField = (field: keyof ResultPayload, value: string) => {
    setForm((current) => ({ ...current, [field]: Number(value) }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    mutation.mutate(form, {
      onSuccess: (responseBody) => {
        const savedMessage =
          typeof responseBody === 'object' && responseBody !== null && 'message' in responseBody
            ? String(responseBody.message)
            : 'Resultat gemt.';
        setMessage(savedMessage);
        setForm(initialForm);
      },
    });
  };

  return (
    <section className="api-panel api-form-panel mt-8">
      <div className="mb-6 border-b border-slate-900/10 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">Results API</p>
        <h2 className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">Gem resultat</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Registrér et holds tid på en station.</p>
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
          Station ID
          <input
            aria-label="Station ID"
            type="number"
            min="1"
            required
            value={form.station_id}
            onChange={(event) => updateField('station_id', event.target.value)}
            className="api-input"
          />
        </label>

        <label className="api-label">
          Sekunder
          <input
            aria-label="Seconds"
            type="number"
            min="0"
            required
            value={form.seconds}
            onChange={(event) => updateField('seconds', event.target.value)}
            className="api-input"
          />
        </label>

        <div className="md:col-span-3">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="api-button w-full sm:w-auto"
          >
            {mutation.isPending ? 'Gemmer resultat...' : 'Gem resultat'}
          </button>
        </div>
      </form>

      {message && <p role="status" className="mt-4 rounded-xl border border-emerald-900/10 bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p>}
      {mutation.error && <p role="alert" className="mt-4 rounded-xl border border-red-900/10 bg-red-50 p-3 text-sm text-red-800">{mutation.error.message}</p>}
    </section>
  );
}
