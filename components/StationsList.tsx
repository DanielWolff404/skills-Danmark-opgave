'use client';

import { useMemo } from 'react';
import { useStations } from '@/hooks/useCompetitionApi';

type ApiStation = {
  station_id?: string | number;
  station_number?: string | number;
  name?: string;
};

type StationItem = {
  stationId: string | number;
  stationNumber: number;
  name: string;
};

export default function StationsList() {
  const { data, isLoading: loading, error } = useStations();

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
        };
      })
      .sort((a, b) => a.stationNumber - b.stationNumber);
  }, [data]);

  if (loading) {
    return (
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl rounded-2xl border border-gray-300 bg-white/90 p-5 dark:border-gray-700 dark:bg-gray-800/90 sm:p-8">
          <p className="text-gray-700 dark:text-gray-300">Loading stations...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl rounded-2xl border border-red-300 bg-red-100/80 p-5 dark:border-red-800 dark:bg-red-900/25 sm:p-8">
          <p className="text-red-800 dark:text-red-200 font-semibold">Unable to load stations</p>
          <p className="text-red-700 dark:text-red-300 text-sm mt-1">{error.message}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-black text-white p-5">
            <p className="text-sm text-gray-200">Total Stations</p>
            <p className="text-3xl font-bold mt-1">{stations.length}</p>
          </div>
          <div className="rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 p-5">
            <p className="text-sm text-gray-600 dark:text-gray-300">First Station</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
              {stations[0]?.stationNumber ?? '-'}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 p-5">
            <p className="text-sm text-gray-600 dark:text-gray-300">Last Station</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
              {stations[stations.length - 1]?.stationNumber ?? '-'}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 sm:gap-5">
            {stations.map((station) => (
              <div
                key={station.stationId}
                className="p-6 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/92 dark:bg-gray-800/92 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Station {station.stationNumber}
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                  {station.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
