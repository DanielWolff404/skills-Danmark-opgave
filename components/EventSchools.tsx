'use client';

import { useEffect, useState } from 'react';

type ApiSchool = {
  id?: string | number;
  school_id?: string | number;
  event_id?: string | number;
  name?: string;
  school_name?: string;
  city?: string;
  municipality?: string;
  region?: string;
};

type SchoolItem = {
  id: string | number;
  name: string;
  city?: string;
  municipality?: string;
  region?: string;
};

type EventSchoolsProps = {
  eventId: string | number;
  title?: string;
  embedded?: boolean;
};

export default function EventSchools({
  eventId,
  title = 'Schools for This Event',
  embedded = true,
}: EventSchoolsProps) {
  const [schools, setSchools] = useState<SchoolItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchoolsByEvent = async () => {
      try {
        setLoading(true);
        setError(null);

        const directSchoolsUrl = process.env.NEXT_PUBLIC_SCHOOLS_URL?.replace(/\/$/, '');
        const directEventsUrl = process.env.NEXT_PUBLIC_EVENTS_URL?.replace(/\/$/, '');
        const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000').replace(/\/$/, '');

        const urls = new Set<string>();

        if (directSchoolsUrl) {
          urls.add(`${directSchoolsUrl}?event_id=${eventId}`);
        }

        if (directEventsUrl) {
          urls.add(directEventsUrl.replace(/\/events(?:\/\d+)?$/, `/schools?event_id=${eventId}`));
        }

        urls.add(`${baseUrl}/api.php/schools?event_id=${eventId}`);
        urls.add(`${baseUrl}/api/schools?event_id=${eventId}`);
        urls.add(`${baseUrl}/schools?event_id=${eventId}`);

        let data: unknown = null;

        for (const url of urls) {
          console.log('Trying schools endpoint:', url);
          const response = await fetch(url);

          if (!response.ok) {
            continue;
          }

          data = await response.json();
          console.log('Schools fetched successfully from:', url, data);
          break;
        }

        if (!data) {
          throw new Error(`Could not load schools for event ${eventId}`);
        }

        const rawSchools: ApiSchool[] = Array.isArray(data)
          ? data
          : Array.isArray((data as { schools?: ApiSchool[] }).schools)
            ? (data as { schools: ApiSchool[] }).schools
            : [];

        const filteredSchools = rawSchools.filter((school) => {
          if (school.event_id === undefined || school.event_id === null) {
            return true;
          }
          return String(school.event_id) === String(eventId);
        });

        const normalizedSchools: SchoolItem[] = filteredSchools.map((school, index) => ({
          id: school.id ?? school.school_id ?? index,
          name: school.name ?? school.school_name ?? 'Unnamed School',
          city: school.city,
          municipality: school.municipality,
          region: school.region,
        }));

        setSchools(normalizedSchools);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    void fetchSchoolsByEvent();
  }, [eventId]);

  return (
    <div className={embedded ? 'mt-8 border-t border-gray-300 pt-6 dark:border-gray-700' : ''}>
      <h4 className="mb-4 text-2xl font-bold text-white">{title}</h4>

      {loading && (
        <p className="text-black">Indlæser skoler...</p>
      )}

      {error && (
        <p role="alert" className="rounded-xl border border-red-900/10 bg-red-50 p-4 text-red-700">Unable to load schools: {error}</p>
      )}

      {!loading && !error && schools.length === 0 && (
        <p className="text-white">Ingen skoler fundet til dette event.</p>
      )}

      {!loading && !error && schools.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schools.map((school) => (
            <div
              key={school.id}
              className="api-card"
            >
              <p className="text-lg font-semibold text-black">{school.name}</p>
              {school.city && (
                <p className="text-sm text-black">By: {school.city}</p>
              )}
              {school.municipality && (
                <p className="text-sm text-black">Kommune: {school.municipality}</p>
              )}
              {school.region && (
                <p className="text-sm text-black">Region: {school.region}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
