'use client';

import { FormEvent, useState } from 'react';
import { useCreateSchool } from '@/hooks/useCompetitionApi';

type SchoolPayload = {
  school_id: number;
  event_id: number;
  name: string;
};

const initialForm: SchoolPayload = {
  school_id: 4,
  event_id: 2,
  name: 'Grenaa Østskole',
};

export default function SchoolCreateForm() {
  const [form, setForm] = useState<SchoolPayload>(initialForm);
  const [message, setMessage] = useState<string | null>(null);

  const mutation = useCreateSchool();

  const updateField = (field: keyof SchoolPayload, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: field === 'name' ? value : Number(value),
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    mutation.mutate(form, {
      onSuccess: () => {
        setMessage('Skole oprettet.');
        setForm(initialForm);
      },
    });
  };

  return (
    <section className="api-panel api-form-panel mt-8">
      <div className="mb-6 border-b border-slate-900/10 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">Schools API</p>
        <h2 className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">Opret skole</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Knyt en skole til et event.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <label className="api-label">
          School ID
          <input
            aria-label="School ID"
            type="number"
            min="1"
            required
            value={form.school_id}
            onChange={(event) => updateField('school_id', event.target.value)}
            className="api-input"
          />
        </label>

        <label className="api-label">
          Event ID
          <input
            aria-label="Event ID"
            type="number"
            min="1"
            required
            value={form.event_id}
            onChange={(event) => updateField('event_id', event.target.value)}
            className="api-input"
          />
        </label>

        <label className="api-label">
          Skolenavn
          <input
            aria-label="School name"
            type="text"
            required
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="api-input"
          />
        </label>

        <div className="md:col-span-3">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="api-button w-full sm:w-auto"
          >
            {mutation.isPending ? 'Opretter skole...' : 'Opret skole'}
          </button>
        </div>
      </form>

      {message && <p role="status" className="mt-4 rounded-xl border border-emerald-900/10 bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p>}
      {mutation.error && <p role="alert" className="mt-4 rounded-xl border border-red-900/10 bg-red-50 p-3 text-sm text-red-800">{mutation.error.message}</p>}
    </section>
  );
}
