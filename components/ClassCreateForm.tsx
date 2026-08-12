'use client';

import { FormEvent, useState } from 'react';
import { useCreateClass } from '@/hooks/useCompetitionApi';

type ClassPayload = {
  class_id: number;
  school_id: number;
  name: string;
  teacher_name: string;
};

export default function ClassCreateForm() {
  const [form, setForm] = useState<ClassPayload>(initialForm);
  const [message, setMessage] = useState<string | null>(null);

  const mutation = useCreateClass();

  const updateField = (field: keyof ClassPayload, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: field === 'name' || field === 'teacher_name' ? value : Number(value),
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    mutation.mutate(form, {
      onSuccess: () => {
        setMessage('Class created successfully.');
        setForm(initialForm);
      },
    });
  };

  return (
    <section className="api-panel api-form-panel mt-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Classes API</p>
        <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Create class</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Add a class directly to the competition platform.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
          Class name
          <input
            type="text"
            required
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="api-input"
          />
        </label>

        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Teacher name
          <input
            type="text"
            required
            value={form.teacher_name}
            onChange={(event) => updateField('teacher_name', event.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </label>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="api-button"
          >
            {mutation.isPending ? 'Creating class...' : 'Create class'}
          </button>
        </div>
      </form>

      {message && <p className="mt-4 rounded-lg bg-green-100 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">{message}</p>}
      {mutation.error && <p className="mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-200">{mutation.error.message}</p>}
    </section>
  );
}
