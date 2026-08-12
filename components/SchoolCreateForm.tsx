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
        setMessage('School created successfully.');
        setForm(initialForm);
      },
    });
  };

  return (
    <section className="api-panel api-form-panel mt-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Schools API</p>
        <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Create school</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Connect a school to an event.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <label className="api-label">
          School ID
          <input
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
            type="number"
            min="1"
            required
            value={form.event_id}
            onChange={(event) => updateField('event_id', event.target.value)}
            className="api-input"
          />
        </label>

        <label className="api-label">
          School name
          <input
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
            className="api-button"
          >
            {mutation.isPending ? 'Creating school...' : 'Create school'}
          </button>
        </div>
      </form>

      {message && <p className="mt-4 rounded-lg bg-green-100 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">{message}</p>}
      {mutation.error && <p className="mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-200">{mutation.error.message}</p>}
    </section>
  );
}
