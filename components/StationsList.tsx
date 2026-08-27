'use client';

import { useMemo } from 'react';
import { useClassResults, useStations } from '@/hooks/useCompetitionApi';

type ApiStation = {
  station_id?: string | number;
  station_number?: string | number;
  name?: string;
};

type ApiClassStation = {
  team_number?: string | number;
  station_id?: string | number;
  result_id?: string | number | null;
};

type StationItem = {
  stationId: string | number;
  stationNumber: number;
  name: string;
  teamNumber: number | null;
};

export default function StationsList() {
  const { data, isLoading: loading, error } = useStations();
  const { data: classResults } = useClassResults(1);

  const stations = useMemo<StationItem[]>(() => {
    const rawStations: ApiStation[] = Array.isArray(data)
      ? data
      : Array.isArray((data as { stations?: ApiStation[] } | undefined)?.stations)
        ? (data as { stations: ApiStation[] }).stations
        : [];

    return rawStations
      .map((station, index) => {
        const stationNumber = Number(station.station_number);
        return {
          stationId: station.station_id ?? index,
          stationNumber: Number.isFinite(stationNumber) ? stationNumber : index + 1,
          name: station.name ?? 'Unnamed Station',
          teamNumber: null,
        };
      })
      .sort((a, b) => a.stationNumber - b.stationNumber);
  }, [data]);

  const stationsWithTeams = useMemo(() => {
    const rawResults: ApiClassStation[] = Array.isArray(classResults)
      ? classResults
      : Array.isArray((classResults as { results?: ApiClassStation[] } | undefined)?.results)
        ? (classResults as { results: ApiClassStation[] }).results
        : [];
    const currentTeamByStation = new Map<number, number>();

    rawResults.forEach((result) => {
      const stationId = Number(result.station_id);
      const teamNumber = Number(result.team_number);
      if (result.result_id === null && Number.isFinite(stationId) && Number.isFinite(teamNumber) && !currentTeamByStation.has(stationId)) {
        currentTeamByStation.set(stationId, teamNumber);
      }
    });

    return stations.map((station) => ({
      ...station,
      teamNumber: currentTeamByStation.get(Number(station.stationId)) ?? null,
    }));
  }, [classResults, stations]);

  const activeStation = stationsWithTeams.find((station) => station.teamNumber !== null);

  if (loading) {
    return (
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
            <div className="api-panel mx-auto max-w-7xl p-5 sm:p-8">
          <p className="text-gray-700 dark:text-gray-300">Loading stations...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl rounded-2xl border border-red-900/10 bg-red-50 p-5 sm:p-8">
          <p className="text-red-800 dark:text-red-200 font-semibold">Stationer kunne ikke indlæses</p>
          <p className="text-red-700 dark:text-red-300 text-sm mt-1">{error.message}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-900 p-5 text-white">
            <p className="text-sm text-gray-200">Antal stationer</p>
            <p className="text-3xl font-bold mt-1">{stations.length}</p>
          </div>
          <div className="api-card p-5">
            <p className="text-sm text-black">Første station</p>
            <p className="text-3xl font-bold text-black mt-1">
              {stations[0]?.stationNumber ?? '-'}
            </p>
          </div>
          <div className="api-card p-5">
            <p className="text-sm text-black">Sidste station</p>
            <p className="text-3xl font-bold text-black mt-1">
              {stations[stations.length - 1]?.stationNumber ?? '-'}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {activeStation && (
            <div aria-live="polite" className="mb-6 rounded-2xl border-2 border-teal-300 bg-teal-950 p-6 text-white shadow-xl shadow-teal-950/25">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-200">Her er holdet nu</p>
                <span className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-bold text-emerald-950">I gang</span>
              </div>
              <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h2 className="text-3xl font-bold text-white">Station {activeStation.stationNumber}</h2>
                <span className="text-xl font-semibold text-teal-100">{activeStation.name}</span>
              </div>
              <p className="mt-2 text-sm text-teal-100">Hold {activeStation.teamNumber} er på denne station.</p>
            </div>
          )}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 sm:gap-5">
            {stationsWithTeams.map((station) => (
              <div
                key={station.stationId}
                className={`api-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${station.teamNumber !== null ? 'border-2 border-emerald-600 bg-emerald-50' : 'border-slate-900/10'}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold uppercase tracking-wide text-teal-900">
                    Station {station.stationNumber}
                  </p>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${station.teamNumber !== null ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    {station.teamNumber !== null ? 'I gang' : 'Ledig'}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-black">
                  {station.name}
                </h3>
                <p className={`mt-4 text-lg font-semibold ${station.teamNumber !== null ? 'text-emerald-900' : 'text-slate-700'}`}>
                  {station.teamNumber !== null ? `Hold ${station.teamNumber} er her` : 'Intet hold på stationen'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
