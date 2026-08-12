'use client';

import { useState, useMemo } from 'react';
import { useEvent, useEvents } from '@/hooks/useCompetitionApi';
import EventSchools from '@/components/EventSchools';

type ApiEvent = {
  id?: string | number;
  event_id?: string | number;
  title?: string;
  name?: string;
  date?: string;
  event_date?: string;
  time?: string;
  location?: string;
  description?: string;
  category?: string;
};

type EventItem = {
  id: string | number;
  title: string;
  date?: string;
  time?: string;
  location?: string;
  description?: string;
  category?: string;
};

const normalizeEvent = (event: ApiEvent, fallbackId: string | number): EventItem => ({
  id: event.id ?? event.event_id ?? fallbackId,
  title: event.title ?? event.name ?? 'Untitled Event',
  date: event.date ?? event.event_date,
  time: event.time,
  location: event.location,
  description: event.description,
  category: event.category,
});

export default function Events() {
  const [selectedEventId, setSelectedEventId] = useState<string | number | null>(null);

  const { data, isLoading: loading, error } = useEvents();

  const events = useMemo<EventItem[]>(() => {
    const rawEvents: ApiEvent[] = Array.isArray(data)
      ? data
      : Array.isArray((data as { events?: ApiEvent[] } | undefined)?.events)
        ? (data as { events: ApiEvent[] }).events
        : [];

    return rawEvents.map((event, index) => normalizeEvent(event, index));
  }, [data]);

  const { data: selectedEventData } = useEvent(selectedEventId);
  const selectedEvent = useMemo<EventItem | null>(() => {
    if (selectedEventId === null) return null;

    const rawEvent = Array.isArray(selectedEventData)
      ? selectedEventData[0]
      : Array.isArray((selectedEventData as { events?: ApiEvent[] } | undefined)?.events)
        ? (selectedEventData as { events: ApiEvent[] }).events[0]
        : selectedEventData as ApiEvent | undefined;

    return rawEvent && typeof rawEvent === 'object'
      ? normalizeEvent(rawEvent, selectedEventId)
      : events.find((event) => event.id === selectedEventId) ?? null;
  }, [events, selectedEventData, selectedEventId]);

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto rounded-3xl border border-gray-300 dark:border-gray-700 bg-white/92 dark:bg-gray-800/92 p-8">
          <p className="text-gray-700 dark:text-gray-300 text-lg">Loading events...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="p-8 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-xl">
            <p className="text-red-800 dark:text-red-200 text-lg font-semibold mb-2">
              Unable to load events
            </p>
            <p className="text-red-700 dark:text-red-300 text-sm">
              {error.message}
            </p>
            <p className="text-red-600 dark:text-red-400 text-xs mt-4">
              Check browser console for more details. Make sure your API base URL is configured in .env.local
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto rounded-3xl border border-gray-300 dark:border-gray-700 bg-white/92 dark:bg-gray-800/92 p-8 text-center">
          <p className="text-gray-700 dark:text-gray-300 text-lg">No events available at this time</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-900 dark:text-white sm:mb-12 sm:text-4xl">
          Upcoming Events
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={event.id || index}
              className="group flex min-w-0 flex-col rounded-xl border border-gray-300 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-black hover:shadow-xl dark:border-gray-700 dark:bg-gray-800/90 sm:p-8"
            >
              {/* Date Badge */}
              {event.date && (
                <div className="mb-4 inline-flex max-w-full self-start rounded-full bg-black px-3 py-1 text-sm font-medium text-white">
                  {new Date(event.date).toLocaleDateString()}
                </div>
              )}
              
              {/* Event Title */}
              <h3 className="mb-2 wrap-break-word text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                {event.title}
              </h3>
              
              {/* Event Time */}
              {event.time && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  ⏰ {event.time}
                </p>
              )}
              
              {/* Event Location */}
              {event.location && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  📍 {event.location}
                </p>
              )}
              
              {/* Event Description */}
              {event.description && (
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {event.description}
                </p>
              )}
              
              {/* Event Category */}
              {event.category && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full text-xs font-medium">
                    {event.category}
                  </span>
                </div>
              )}
              
              {/* Select Button */}
              <button
                onClick={() => {
                  setSelectedEventId(event.id);
                }}
                className="mt-auto w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
              >
                View Schools
              </button>
            </div>
          ))}
        </div>

        {selectedEvent && (
          <div className="mt-8 rounded-xl border border-gray-300 bg-white/90 p-5 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/90 sm:p-8">
            <p className="text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-2">
              Selected Event
            </p>
            <h3 className="mb-4 wrap-break-word text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              {selectedEvent.title}
            </h3>
            {selectedEvent.date && (
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Date: {new Date(selectedEvent.date).toLocaleDateString()}
              </p>
            )}
            {selectedEvent.time && (
              <p className="text-gray-700 dark:text-gray-300 mb-2">Time: {selectedEvent.time}</p>
            )}
            {selectedEvent.location && (
              <p className="text-gray-700 dark:text-gray-300 mb-2">Location: {selectedEvent.location}</p>
            )}
            {selectedEvent.description && (
              <p className="text-gray-700 dark:text-gray-300 mt-4">{selectedEvent.description}</p>
            )}

            <EventSchools eventId={selectedEvent.id} />
          </div>
        )}
      </div>
    </section>
  );
}
