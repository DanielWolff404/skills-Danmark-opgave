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
            : 'Result saved.';
        setMessage(savedMessage);
        setForm(initialForm);
      },
    });
  };

  return (
    <section className="api-panel api-form-panel mt-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Results API</p>
        <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Save result</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Record a team&apos;s time for a station.</p>
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
          Station ID
          <input
            type="number"
            min="1"
            required
            value={form.station_id}
            onChange={(event) => updateField('station_id', event.target.value)}
            className="api-input"
          />
        </label>

        <label className="api-label">
          Seconds
          <input
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
            className="api-button"
          >
            {mutation.isPending ? 'Saving result...' : 'Save result'}
          </button>
        </div>
      </form>

      {message && <p className="mt-4 rounded-lg bg-green-100 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">{message}</p>}
      {mutation.error && <p className="mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-200">{mutation.error.message}</p>}
    </section>
  );
}
