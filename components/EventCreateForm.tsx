'use client';

import { FormEvent, useState } from 'react';
import { useCreateEvent } from '@/hooks/useCompetitionApi';

type EventPayload = {
  name: string;
  event_date: string;
};

const initialForm: EventPayload = {
  name: 'Skills 2026 - DAG 4',
  event_date: '2026-10-06',
};

export default function EventCreateForm() {
  const [form, setForm] = useState<EventPayload>(initialForm);
  const [message, setMessage] = useState<string | null>(null);
  const mutation = useCreateEvent();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    mutation.mutate(form, {
      onSuccess: () => {
        setMessage('Event oprettet.');
        setForm(initialForm);
      },
    });
  };

  return (
    <section className="api-panel api-form-panel mt-8">
      <div className="mb-6 border-b border-slate-900/10 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">Events API</p>
        <h2 className="mt-2 text-3xl font-semibold text-gray-800">Opret event</h2>
        <p className="mt-2 text-gray-700">Planlæg et nyt konkurrenceevent.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <label className="api-label md:col-span-2">
          Eventnavn
          <input
            aria-label="Event name"
            type="text"
            required
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            className="api-input"
          />
        </label>

        <label className="api-label">
          Eventdato
          <input
            aria-label="Event date"
            type="date"
            required
            value={form.event_date}
            onChange={(event) => setForm((current) => ({ ...current, event_date: event.target.value }))}
            className="api-input"
          />
        </label>

        <div className="md:col-span-3">
          <button type="submit" disabled={mutation.isPending} className="api-button w-full sm:w-auto">
            {mutation.isPending ? 'Opretter event...' : 'Opret event'}
          </button>
        </div>
      </form>

      {message && <p role="status" className="mt-4 rounded-xl border border-emerald-900/10 bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p>}
      {mutation.error && <p role="alert" className="mt-4 rounded-xl border border-red-900/10 bg-red-50 p-3 text-sm text-red-800">{mutation.error.message}</p>}
    </section>
  );
}
