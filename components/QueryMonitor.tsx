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
          <h2 className="mt-2 text-3xl font-semibold text-gray-800">Cache flow</h2>
          <p className="mt-2 text-gray-700">Watch API queries and mutations as they move through the app.</p>
        </div>
        <span className="api-pill">Live monitor</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="api-card">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-600">Fetching GETs</p>
          <p className="mt-2 text-4xl font-semibold text-gray-800">{fetchingCount}</p>
          <p className="mt-1 text-sm text-gray-600">Queries loading now</p>
        </div>
        <div className="api-card">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-600">Active mutations</p>
          <p className="mt-2 text-4xl font-semibold text-gray-800">{mutatingCount}</p>
          <p className="mt-1 text-sm text-gray-600">POST or PUT in progress</p>
        </div>
        <div className="api-card">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-600">Cached queries</p>
          <p className="mt-2 text-4xl font-semibold text-gray-800">{queries.length}</p>
          <p className="mt-1 text-sm text-gray-600">Available in memory</p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-900/10 bg-[#f8f5ee]">
        <div className="border-b border-slate-900/10 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-700">Query cache</p>
        </div>
        {queries.length === 0 ? (
          <p className="px-5 py-6 text-sm text-gray-700">No cached queries yet. Open a data tab to populate the cache.</p>
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
