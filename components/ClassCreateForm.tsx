'use client';

import { FormEvent, useState } from 'react';
import { useCreateClass } from '@/hooks/useCompetitionApi';

type ClassPayload = {
  class_id: number;
  school_id: number;
  name: string;
  teacher_name: string;
};

const initialForm: ClassPayload = {
  class_id: 1,
  school_id: 1,
  name: '',
  teacher_name: '',
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
        setMessage('Klasse oprettet.');
        setForm(initialForm);
      },
    });
  };

  return (
    <section className="api-panel api-form-panel mt-8">
      <div className="mb-6 border-b border-slate-900/10 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">Classes API</p>
        <h2 className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">Opret klasse</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Tilføj en klasse direkte til konkurrenceplatformen.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
          Klassenavn
          <input
            aria-label="Class name"
            type="text"
            required
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="api-input"
          />
        </label>

        <label className="api-label">
          Lærernavn
          <input
            aria-label="Teacher name"
            type="text"
            required
            value={form.teacher_name}
            onChange={(event) => updateField('teacher_name', event.target.value)}
            className="api-input"
          />
        </label>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="api-button w-full sm:w-auto"
          >
            {mutation.isPending ? 'Opretter klasse...' : 'Opret klasse'}
          </button>
        </div>
      </form>

      {message && <p role="status" className="mt-4 rounded-xl border border-emerald-900/10 bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p>}
      {mutation.error && <p role="alert" className="mt-4 rounded-xl border border-red-900/10 bg-red-50 p-3 text-sm text-red-800">{mutation.error.message}</p>}
    </section>
  );
}
