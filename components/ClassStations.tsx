'use client';

import { useMemo, useState } from 'react';
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
  const [selectedTeam, setSelectedTeam] = useState(teamNumber !== undefined ? String(teamNumber) : '');
  const [isTeamFilterOpen, setIsTeamFilterOpen] = useState(true);

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

  const teamOptions = useMemo(() => {
    return Array.from(new Set(allRows.map((row) => row.teamNumber))).sort((a, b) => a - b);
  }, [allRows]);

  const effectiveSelectedTeam = selectedTeam || (teamNumber !== undefined ? String(teamNumber) : String(teamOptions[0] ?? ''));

  const rows = useMemo(() => {
    return effectiveSelectedTeam === 'all' || effectiveSelectedTeam === ''
      ? allRows
      : allRows.filter((row) => row.teamNumber === Number(effectiveSelectedTeam));
  }, [allRows, effectiveSelectedTeam]);

  const teamsCount = useMemo(() => new Set(rows.map((row) => row.teamId)).size, [rows]);
  const completedCount = useMemo(() => rows.filter((row) => row.seconds !== null).length, [rows]);
  const currentStation = useMemo(
    () => rows.find((row) => row.seconds === null) ?? null,
    [rows],
  );

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
      <div className="api-panel competition-board mx-auto max-w-7xl overflow-hidden bg-slate-950">
        <div className="api-panel-header border-slate-700 bg-slate-900">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
            <div className="api-pill text-teal-950">
              Class {classId}{effectiveSelectedTeam !== 'all' && effectiveSelectedTeam !== '' ? ` · Team ${effectiveSelectedTeam}` : ''}
            </div>
          </div>
        </div>

        <div className="api-panel-body bg-slate-950">
          {!loading && !error && teamOptions.length > 0 && !isTeamFilterOpen && (
            <button
              type="button"
              onClick={() => setIsTeamFilterOpen(true)}
              className="mb-6 rounded-xl border border-teal-400/40 bg-teal-400/15 px-4 py-2 text-sm font-semibold text-teal-100 transition-colors hover:bg-teal-400/25"
            >
              Skift hold
            </button>
          )}

          {!loading && !error && teamOptions.length > 0 && isTeamFilterOpen && (
            <div className="mb-6 rounded-2xl border border-slate-700 bg-slate-800 p-4 sm:flex sm:items-center sm:justify-between sm:gap-6">
              <div>
                <label htmlFor={`team-select-${classId}`} className="text-sm font-semibold text-white">
                  Vis stationsresultater for
                </label>
                <p className="mt-1 text-sm text-slate-300">Vælg ét hold for at holde overblikket enkelt.</p>
              </div>
              <div className="mt-3 flex w-full flex-col gap-2 sm:mt-0 sm:max-w-xs">
                <select
                  id={`team-select-${classId}`}
                  value={effectiveSelectedTeam}
                  onChange={(event) => setSelectedTeam(event.target.value)}
                  className="w-full rounded-xl border border-slate-600 bg-slate-700 px-3 py-2.5 font-semibold text-white outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
                >
                  {teamOptions.map((option) => (
                    <option key={option} value={option}>Hold {option}</option>
                  ))}
                  <option value="all">Alle hold</option>
                </select>
                <button
                  type="button"
                  onClick={() => setIsTeamFilterOpen(false)}
                  className="self-end rounded-md px-2 py-1 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                >
                  Luk
                </button>
              </div>
            </div>
          )}

          {loading && (
            <div className="api-card animate-pulse">
              <p className="text-gray-700">Indlæser klassens resultater...</p>
            </div>
          )}

          {error && (
            <div role="alert" className="rounded-2xl border border-red-900/10 bg-red-50 p-5">
              <p className="text-red-800 dark:text-red-200 font-semibold">Klassens resultater kunne ikke indlæses</p>
              <p className="text-red-700 dark:text-red-300 text-sm mt-1">{error.message}</p>
            </div>
          )}

          {!loading && !error && currentStation && effectiveSelectedTeam !== 'all' && (
            <div className="mb-6 rounded-2xl border border-teal-300/40 bg-teal-400/15 p-5 shadow-lg shadow-teal-950/20">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-200">I er her nu</p>
              <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="text-2xl font-bold text-white">Station {currentStation.stationNumber}: {currentStation.stationName}</h3>
                <span className="text-sm font-semibold text-teal-100">Hold {effectiveSelectedTeam}</span>
              </div>
              <p className="mt-2 text-sm text-teal-100">Denne station mangler stadig et resultat.</p>
            </div>
          )}

          {!loading && !error && rows.length === 0 && (
            <p className="text-gray-700 dark:text-gray-300">Ingen klasseresultater fundet.</p>
          )}

          {!loading && !error && rows.length > 0 && (
            <>
                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="api-card border-l-4 border-l-slate-400 bg-slate-800">
                  <div className="flex items-start justify-between gap-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">Stations</p>
                    <span className="api-pill text-teal-950">Live</span>
                  </div>
                  <p className="mt-2 text-5xl font-semibold leading-none text-white">{rows.length}</p>
                  <p className="mt-2 text-sm text-slate-300">Samlede stationsresultater</p>
                </div>
                <div className="api-card border-l-4 border-l-teal-400 bg-slate-800">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-200">Hold</p>
                  <p className="mt-2 text-4xl font-semibold text-white">{teamsCount}</p>
                  <p className="mt-1 text-sm text-slate-300">Aktive i klassen</p>
                </div>
                <div className="api-card border-l-4 border-l-amber-400 bg-slate-800">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">Gennemført</p>
                  <p className="mt-2 text-4xl font-semibold text-white">{completedCount}</p>
                  <p className="mt-1 text-sm text-slate-300">Indsendte resultater</p>
                </div>
              </div>

              <div className="space-y-5">
                {groupedByTeam.map(([teamNumber, teamRows]) => (
                  <div key={teamNumber} className="api-card border-slate-700 bg-slate-800">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <h3 className="text-xl font-semibold text-white">Hold {teamNumber}</h3>
                      <span className="text-sm font-medium text-slate-300">{teamRows.length} stationer</span>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {teamRows.map((row) => (
                        <div
                          key={`${row.teamId}-${row.stationId}`}
                          className={`rounded-xl border p-4 shadow-sm ${currentStation?.stationId === row.stationId && effectiveSelectedTeam !== 'all' ? 'border-teal-300 bg-teal-900/70 ring-2 ring-teal-300/40' : 'border-slate-600 bg-slate-700'}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-teal-200">Station {row.stationNumber}</p>
                            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${row.seconds !== null ? 'bg-emerald-100 text-black!' : 'bg-amber-100 text-black!'}`}>
                              {row.seconds !== null ? 'Gennemført' : 'Afventer'}
                            </span>
                          </div>
                          <p className="mt-2 text-lg font-semibold text-white">{row.stationName}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full border border-slate-500 bg-slate-800 px-3 py-1 text-xs font-medium text-white">
                              Resultat: {row.resultId ?? 'Afventer'}
                            </span>
                            <span className="rounded-full border border-slate-500 bg-slate-800 px-3 py-1 text-xs font-medium text-white">
                              Tid: {row.seconds !== null ? `${row.seconds}s` : 'Afventer'}
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
