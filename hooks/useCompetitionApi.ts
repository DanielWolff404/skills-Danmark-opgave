'use client';

import { useApiMutation, useApiQuery, fetchJson } from '@/hooks/useApi';

const API_BASE = 'http://mb3.web.videndjurs.dk/skillscompetition/api.php';

function endpoint(name: string) {
  const configuredBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
  const apiRoot = configuredBase && !/^https?:\/\/localhost(?::\d+)?$/i.test(configuredBase)
    ? configuredBase
    : API_BASE;

  return `${apiRoot}/${name}`;
}

async function fetchWithFallback<T>(urls: string[]) {
  let lastError = 'Unable to load API data';

  for (const url of urls) {
    try {
      return await fetchJson<T>(url);
    } catch (error) {
      lastError = error instanceof Error ? error.message : lastError;
    }
  }

  throw new Error(`${lastError}. Attempted: ${urls.join(', ')}`);
}

export function useEvents() {
  const directUrl = process.env.NEXT_PUBLIC_EVENTS_URL;
  return useApiQuery({
    queryKey: ['events'],
    queryFn: () => fetchWithFallback<unknown>([
      ...(directUrl ? [directUrl] : []),
      endpoint('events'),
    ]),
  });
}

export function useEvent(eventId: string | number | null) {
  const directUrl = process.env.NEXT_PUBLIC_EVENTS_URL?.replace(/\/$/, '');
  return useApiQuery({
    queryKey: ['events', 'detail', eventId],
    queryFn: () => fetchWithFallback<unknown>([
      ...(directUrl ? [`${directUrl}/${eventId}`, `${directUrl}?id=${eventId}`] : []),
      `${endpoint('events')}/${eventId}`,
      `${endpoint('events')}?id=${eventId}`,
    ]),
    enabled: eventId !== null && eventId !== undefined && eventId !== '',
  });
}

export function useSchoolsByEvent(eventId: string | number) {
  const directUrl = process.env.NEXT_PUBLIC_SCHOOLS_URL;
  return useApiQuery({
    queryKey: ['schools', 'event', eventId],
    queryFn: () => fetchWithFallback<unknown>([
      ...(directUrl ? [`${directUrl}?event_id=${eventId}`] : []),
      `${endpoint('schools')}?event_id=${eventId}`,
    ]),
    enabled: eventId !== undefined && eventId !== null && eventId !== '',
  });
}

export function useStations() {
  const directUrl = process.env.NEXT_PUBLIC_STATIONS_URL;
  return useApiQuery({
    queryKey: ['stations'],
    queryFn: () => fetchWithFallback<unknown>([
      ...(directUrl ? [directUrl] : []),
      endpoint('stations'),
    ]),
  });
}

export function useClassesBySchool(schoolId: string | number) {
  const directUrl = process.env.NEXT_PUBLIC_CLASSES_URL;
  return useApiQuery({
    queryKey: ['classes', 'school', schoolId],
    queryFn: () => fetchWithFallback<unknown>([
      ...(directUrl ? [`${directUrl}?school_id=${schoolId}`] : []),
      `${endpoint('classes')}?school_id=${schoolId}`,
    ]),
    enabled: schoolId !== undefined && schoolId !== null && schoolId !== '',
  });
}

export function useClassResults(classId: string | number) {
  const directUrl = process.env.NEXT_PUBLIC_CLASSES_URL;
  return useApiQuery({
    queryKey: ['classes', 'results', classId],
    queryFn: () => fetchWithFallback<unknown>([
      ...(directUrl ? [`${directUrl}?class_id=${classId}`] : []),
      `${endpoint('classes')}?class_id=${classId}`,
    ]),
    enabled: classId !== undefined && classId !== null && classId !== '',
  });
}

export function useTeamsByClass(classId: string | number) {
  const directUrl = process.env.NEXT_PUBLIC_TEAMS_URL;
  return useApiQuery({
    queryKey: ['teams', 'class', classId],
    queryFn: () => fetchWithFallback<unknown>([
      ...(directUrl ? [`${directUrl}?class_id=${classId}`] : []),
      `${endpoint('teams')}?class_id=${classId}`,
    ]),
    enabled: classId !== undefined && classId !== null && classId !== '',
  });
}

export function useTeamResults(teamId: string | number) {
  const directUrl = process.env.NEXT_PUBLIC_TEAMS_URL;
  return useApiQuery({
    queryKey: ['teams', 'results', teamId],
    queryFn: () => fetchWithFallback<unknown>([
      ...(directUrl ? [`${directUrl}?team_id=${teamId}`] : []),
      `${endpoint('teams')}?team_id=${teamId}`,
    ]),
    enabled: teamId !== undefined && teamId !== null && teamId !== '',
  });
}

export function useCreateResult() {
  return useApiMutation(
    (payload: { team_id: number; station_id: number; seconds: number }) =>
      fetchJson<unknown>('/api/proxy/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      }),
  );
}

export function useCreateClass() {
  return useApiMutation(
    (payload: { class_id: number; school_id: number; name: string; teacher_name: string }) =>
      fetchJson<unknown>('/api/proxy/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      }),
  );
}

export function useCreateTeam() {
  return useApiMutation(
    (payload: { team_id: number; class_id: number; team_number: number }) =>
      fetchJson<unknown>('/api/proxy/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      }),
  );
}

export function useCreateEvent() {
  return useApiMutation(
    (payload: { name: string; event_date: string }) =>
      fetchJson<unknown>('/api/proxy/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      }),
  );
}

export function useUpdateEvent(eventId: string | number) {
  return useApiMutation(
    (payload: { name: string; event_date: string }) =>
      fetchJson<unknown>(`/api/proxy/events/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      }),
  );
}

export function useCreateSchool() {
  return useApiMutation(
    (payload: { school_id: number; event_id: number; name: string }) =>
      fetchJson<unknown>('/api/proxy/schools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      }),
  );
}
