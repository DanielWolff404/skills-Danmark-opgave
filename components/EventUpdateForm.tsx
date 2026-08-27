'use client';

import { FormEvent, useState } from 'react';
import { useUpdateEvent } from '@/hooks/useCompetitionApi';

type EventUpdatePayload = {
  name: string;
  event_date: string;
};

type EventUpdateFormProps = {
  eventId?: number | string;
};

const initialForm: EventUpdatePayload = {
  name: 'Skills 2026 - Mandag',
  event_date: '2026-10-05',
};

export default function EventUpdateForm({
  eventId = 1,
}: EventUpdateFormProps) {
  const [form, setForm] = useState<EventUpdatePayload>(initialForm);
  const [message, setMessage] = useState<string | null>(null);

  const mutation = useUpdateEvent(eventId);

  const updateField = (field: keyof EventUpdatePayload, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    mutation.mutate(form, {
      onSuccess: () => {
        setMessage(`Event ${eventId} updated successfully.`);
      },
    });
  };

  return (
    <section className="api-panel api-form-panel mt-8">
      <div className="mb-7 flex flex-col gap-4 border-b border-slate-900/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">Events API</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Update event</h2>
          <p className="mt-2 max-w-xl text-gray-700">Edit the name and date for this competition event.</p>
        </div>
        <span className="api-pill self-start">Event ID {eventId}</span>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <label className="api-label md:col-span-2">
          Event name
          <input
            type="text"
            required
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="api-input"
          />
        </label>

        <label className="api-label md:col-span-1">
          Event date
          <input
            type="date"
            required
            value={form.event_date}
            onChange={(event) => updateField('event_date', event.target.value)}
            className="api-input"
          />
        </label>

        <div className="md:col-span-2 md:flex md:items-end">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="api-button w-full sm:w-auto"
          >
            {mutation.isPending ? 'Updating event...' : 'Update event'}
          </button>
        </div>
      </form>

      {message && <p role="status" className="mt-4 rounded-xl border border-emerald-900/10 bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p>}
      {mutation.error && <p role="alert" className="mt-4 rounded-xl border border-red-900/10 bg-red-50 p-3 text-sm text-red-800">{mutation.error.message}</p>}
    </section>
  );
}
