'use client';

import { useMemo } from 'react';
import { useClassResults } from '@/hooks/useCompetitionApi';

type ApiClassStationRow = {
  team_id?: number | string;
  team_number?: number | string;
  station_id?: number | string;
  station_number?: number | string;
  station_name?: string;
  result_id?: number | string | null;
  seconds?: number | string | null;
};

type ClassStationRow = {
  teamId: number;
  teamNumber: number;
  stationId: number;
  stationNumber: number;
  stationName: string;
  resultId: number | null;
  seconds: number | null;
};

type ClassStationsProps = {
  classId: number | string;
  teamNumber?: number | string;
  title?: string;
};

export default function ClassStations({
  classId,
  teamNumber,
  title = 'Class Station Results',
}: ClassStationsProps) {
  const { data, isLoading: loading, error } = useClassResults(classId);

  const allRows = useMemo<ClassStationRow[]>(() => {
    const rawRows: ApiClassStationRow[] = Array.isArray(data)
      ? data
      : Array.isArray((data as { results?: ApiClassStationRow[] } | undefined)?.results)
        ? (data as { results: ApiClassStationRow[] }).results
        : [];

    return rawRows
      .map((row, index) => {
        const teamId = Number(row.team_id);
        const teamNumber = Number(row.team_number);
        const stationId = Number(row.station_id);
        const stationNumber = Number(row.station_number);
        const resultId = row.result_id === null || row.result_id === undefined ? null : Number(row.result_id);
        const seconds = row.seconds === null || row.seconds === undefined ? null : Number(row.seconds);

        return {
          teamId: Number.isFinite(teamId) ? teamId : index,
          teamNumber: Number.isFinite(teamNumber) ? teamNumber : 0,
          stationId: Number.isFinite(stationId) ? stationId : index,
          stationNumber: Number.isFinite(stationNumber) ? stationNumber : index + 1,
          stationName: row.station_name || 'Unnamed Station',
          resultId: Number.isFinite(resultId as number) ? (resultId as number) : null,
          seconds: Number.isFinite(seconds as number) ? (seconds as number) : null,
        };
      })
      .sort((a, b) => {
        if (a.teamNumber !== b.teamNumber) return a.teamNumber - b.teamNumber;
        return a.stationNumber - b.stationNumber;
      });
  }, [data]);

  const rows = useMemo(() => {
    return teamNumber === undefined
      ? allRows
      : allRows.filter((row) => row.teamNumber === Number(teamNumber));
  }, [allRows, teamNumber]);

  const teamsCount = useMemo(() => new Set(rows.map((row) => row.teamId)).size, [rows]);
  const completedCount = useMemo(() => rows.filter((row) => row.seconds !== null).length, [rows]);

  const groupedByTeam = useMemo(() => {
    const map = new Map<number, ClassStationRow[]>();
    for (const row of rows) {
      if (!map.has(row.teamNumber)) map.set(row.teamNumber, []);
      map.get(row.teamNumber)?.push(row);
    }
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [rows]);

  return (
    <section className="pb-20 px-4 sm:px-6 lg:px-8">
      <div className="api-panel mx-auto max-w-7xl overflow-hidden">
        <div className="api-panel-header">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-semibold text-gray-800 sm:text-3xl">{title}</h2>
            <div className="api-pill">
              class_id={classId}{teamNumber !== undefined ? ` - team_number=${teamNumber}` : ''}
            </div>
          </div>
        </div>

        <div className="api-panel-body">
          {loading && (
            <p className="text-gray-700 dark:text-gray-300">Loading class results...</p>
          )}

          {error && (
            <div className="rounded-2xl border border-red-300 dark:border-red-800 bg-red-100/80 dark:bg-red-900/25 p-5">
              <p className="text-red-800 dark:text-red-200 font-semibold">Unable to load class results</p>
              <p className="text-red-700 dark:text-red-300 text-sm mt-1">{error.message}</p>
            </div>
          )}

          {!loading && !error && rows.length === 0 && (
            <p className="text-gray-700 dark:text-gray-300">No class results found.</p>
          )}

          {!loading && !error && rows.length > 0 && (
            <>
              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="api-card">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">Rows</p>
                    <span className="api-pill">Live</span>
                  </div>
                  <p className="mt-2 text-5xl font-semibold leading-none text-gray-800">{rows.length}</p>
                  <p className="mt-2 text-sm text-gray-600">Total station records</p>
                </div>
                <div className="api-card">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-600">Teams</p>
                  <p className="mt-2 text-4xl font-semibold text-gray-800">{teamsCount}</p>
                  <p className="mt-1 text-sm text-gray-600">Active in this class</p>
                </div>
                <div className="api-card">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-600">Completed</p>
                  <p className="mt-2 text-4xl font-semibold text-gray-800">{completedCount}</p>
                  <p className="mt-1 text-sm text-gray-600">Results submitted</p>
                </div>
              </div>

              <div className="space-y-5">
                {groupedByTeam.map(([teamNumber, teamRows]) => (
                  <div key={teamNumber} className="api-card">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Team {teamNumber}</h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {teamRows.map((row) => (
                        <div
                          key={`${row.teamId}-${row.stationId}`}
                          className="api-card"
                        >
                          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Station {row.stationNumber}</p>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{row.stationName}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full border border-slate-900/15 bg-white px-3 py-1 text-xs text-gray-800">
                              Result: {row.resultId ?? 'Pending'}
                            </span>
                            <span className="rounded-full border border-slate-900/15 bg-white px-3 py-1 text-xs text-gray-800">
                              Time: {row.seconds !== null ? `${row.seconds}s` : 'Pending'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
