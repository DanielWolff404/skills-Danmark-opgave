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
        setMessage('Event created successfully.');
        setForm(initialForm);
      },
    });
  };

  return (
    <section className="api-panel api-form-panel mt-8">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">Events API</p>
        <h2 className="mt-2 text-3xl font-semibold text-gray-800">Create event</h2>
        <p className="mt-2 text-gray-700">Schedule a new competition event.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <label className="api-label md:col-span-2">
          Event name
          <input
            type="text"
            required
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            className="api-input"
          />
        </label>

        <label className="api-label">
          Event date
          <input
            type="date"
            required
            value={form.event_date}
            onChange={(event) => setForm((current) => ({ ...current, event_date: event.target.value }))}
            className="api-input"
          />
        </label>

        <div className="md:col-span-3">
          <button type="submit" disabled={mutation.isPending} className="api-button">
            {mutation.isPending ? 'Creating event...' : 'Create event'}
          </button>
        </div>
      </form>

      {message && <p className="mt-4 rounded-lg bg-green-100 p-3 text-sm text-green-800">{message}</p>}
      {mutation.error && <p className="mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-800">{mutation.error.message}</p>}
    </section>
  );
}
