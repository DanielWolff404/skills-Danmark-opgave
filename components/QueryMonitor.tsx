'use client';

import { useIsFetching, useIsMutating, useQueryClient } from '@tanstack/react-query';
import { useMemo, useSyncExternalStore } from 'react';

type QuerySnapshot = {
  key: string;
  status: string;
  updatedAt: number;
};

export default function QueryMonitor() {
  const queryClient = useQueryClient();
  const fetchingCount = useIsFetching();
  const mutatingCount = useIsMutating();
  const querySnapshot = useSyncExternalStore(
    (onStoreChange) => queryClient.getQueryCache().subscribe(onStoreChange),
    () => JSON.stringify(queryClient.getQueryCache().getAll().map((query) => ({
      key: query.queryKey.map(String).join(' / '),
      status: query.state.status,
      updatedAt: query.state.dataUpdatedAt,
    }))),
    () => '[]',
  );
  const queries = useMemo<QuerySnapshot[]>(() => JSON.parse(querySnapshot) as QuerySnapshot[], [querySnapshot]);

  return (
    <section className="api-panel api-form-panel mt-8">
      <div className="mb-6 flex flex-col gap-4 border-b border-slate-900/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">TanStack Query</p>
          <h2 className="mt-2 text-3xl font-semibold text-gray-800">Cacheforløb</h2>
          <p className="mt-2 text-gray-700">Følg API-forespørgsler og ændringer, mens de bevæger sig gennem appen.</p>
        </div>
        <span className="api-pill">Liveovervågning</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="api-card">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-600">Hentende GET-kald</p>
          <p className="mt-2 text-4xl font-semibold text-gray-800">{fetchingCount}</p>
          <p className="mt-1 text-sm text-gray-600">Forespørgsler indlæses nu</p>
        </div>
        <div className="api-card">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-600">Aktive ændringer</p>
          <p className="mt-2 text-4xl font-semibold text-gray-800">{mutatingCount}</p>
          <p className="mt-1 text-sm text-gray-600">POST eller PUT i gang</p>
        </div>
        <div className="api-card">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-600">Cachede forespørgsler</p>
          <p className="mt-2 text-4xl font-semibold text-gray-800">{queries.length}</p>
          <p className="mt-1 text-sm text-gray-600">Tilgængelige i hukommelsen</p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-900/10 bg-[#f8f5ee]">
        <div className="border-b border-slate-900/10 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-700">Forespørgselscache</p>
        </div>
        {queries.length === 0 ? (
          <p className="px-5 py-6 text-sm text-gray-700">Ingen cachede forespørgsler endnu. Åbn en datafane for at udfylde cachen.</p>
        ) : (
          <div className="divide-y divide-slate-900/10">
            {queries.map((query) => (
              <div key={query.key} className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-mono text-sm text-gray-800">{query.key}</span>
                <span className="api-pill">{query.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
