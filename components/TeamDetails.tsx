'use client';

import { useMemo } from 'react';
import { useTeamResults, useTeamsByClass } from '@/hooks/useCompetitionApi';

type ApiTeam = {
  id?: string | number;
  team_id?: string | number;
  name?: string;
  title?: string;
  description?: string;
  members?: number | string;
  member_count?: number | string;
};

type ApiStationResult = {
  station_id?: number;
  station_number?: number;
  station_name?: string;
  result_id?: number | null;
  seconds?: number | null;
};

type ApiClassTeam = {
  team_id?: number;
  class_id?: number;
  class_name?: string;
  school_id?: number;
  school_name?: string;
  team_number?: number;
};

type TeamItem = {
  id: string | number;
  name: string;
  description?: string;
  members?: number;
};

type StationItem = {
  stationId: number;
  stationNumber?: number;
  stationName: string;
  resultId?: number | null;
  seconds?: number | null;
};

type ClassTeamItem = {
  teamId: number;
  classId?: number;
  className?: string;
  schoolId?: number;
  schoolName?: string;
  teamNumber?: number;
};

type TeamDetailsResponse = {
  team: TeamItem | null;
  stations: StationItem[];
  classTeams: ClassTeamItem[];
};

type TeamDetailsProps = {
  teamId?: string | number;
  classId?: string | number;
  title?: string;
  embedded?: boolean;
};

export default function TeamDetails({ teamId, classId, title = 'Featured Team', embedded = false }: TeamDetailsProps) {
  const queryKey = classId !== undefined ? 'class_id' : 'team_id';
  const queryValue = classId !== undefined ? classId : teamId;

  // Use the appropriate hook based on the query mode
  const teamResultsQuery = useTeamResults(teamId ?? '');
  const classTeamsQuery = useTeamsByClass(classId ?? '');

  // Pick the active query based on mode
  const activeQuery = classId !== undefined ? classTeamsQuery : teamResultsQuery;
  const { data, isLoading: loading, error } = activeQuery;

  const parsedData = useMemo<TeamDetailsResponse>(() => {
    if (!data) return { team: null, stations: [], classTeams: [] };

    // Station results mode (team_id query)
    if (Array.isArray(data) && data.length > 0 && 'station_id' in data[0]) {
      const stationRows = data as ApiStationResult[];
      const normalizedStations = stationRows
        .map((row, index) => ({
          stationId: row.station_id ?? index,
          stationNumber: row.station_number,
          stationName: row.station_name ?? 'Unnamed Station',
          resultId: row.result_id ?? null,
          seconds: row.seconds ?? null,
        }))
        .sort((a, b) => {
          const left = a.stationNumber ?? Number.MAX_SAFE_INTEGER;
          const right = b.stationNumber ?? Number.MAX_SAFE_INTEGER;
          return left - right;
        });

      return { team: null, stations: normalizedStations, classTeams: [] };
    }

    // Class teams mode (class_id query)
    if (Array.isArray(data) && data.length > 0 && 'class_id' in data[0] && 'team_number' in data[0]) {
      const rows = data as ApiClassTeam[];
      const normalizedClassTeams = rows
        .map((row, index) => ({
          teamId: row.team_id ?? index,
          classId: row.class_id,
          className: row.class_name,
          schoolId: row.school_id,
          schoolName: row.school_name,
          teamNumber: row.team_number,
        }))
        .sort((a, b) => {
          const left = a.teamNumber ?? Number.MAX_SAFE_INTEGER;
          const right = b.teamNumber ?? Number.MAX_SAFE_INTEGER;
          return left - right;
        });

      return { team: null, stations: [], classTeams: normalizedClassTeams };
    }

    // Single team object response
    const rawTeam: ApiTeam | undefined = Array.isArray(data)
      ? data[0]
      : Array.isArray((data as { teams?: ApiTeam[] } | undefined)?.teams)
        ? (data as { teams: ApiTeam[] }).teams[0]
        : (data as ApiTeam);

    if (!rawTeam || typeof rawTeam !== 'object') {
      return { team: null, stations: [], classTeams: [] };
    }

    const membersValue = rawTeam.members ?? rawTeam.member_count;
    const members = typeof membersValue === 'string' ? Number(membersValue) : membersValue;

    return {
      team: {
          id: rawTeam.id ?? rawTeam.team_id ?? queryValue ?? 'unknown',
        name: rawTeam.name ?? rawTeam.title ?? 'Unnamed Team',
        description: rawTeam.description,
        members: typeof members === 'number' && Number.isFinite(members) ? members : undefined,
      },
      stations: [],
      classTeams: [],
    };
  }, [data, queryValue]);

  const team = parsedData.team;
  const stations = parsedData.stations;
  const classTeams = parsedData.classTeams;
  const hasData = Boolean(team) || stations.length > 0 || classTeams.length > 0;
  const modeLabel = queryKey === 'class_id' ? 'Class Teams' : 'Team Results';

  return (
    <section className={embedded ? 'pt-8' : 'px-4 pb-12 sm:px-6 lg:px-8'}>
      <div className="api-panel mx-auto max-w-7xl overflow-hidden">
        <div className="api-panel-header sm:px-8">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-semibold text-black sm:text-3xl">{title}</h2>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-800/30 bg-teal-800/10 px-3 py-1 text-xs text-teal-900 sm:text-sm">
              <span className="font-semibold">{modeLabel}</span>
              <span>{queryKey}={String(queryValue ?? '')}</span>
            </div>
          </div>
        </div>

        <div className="api-panel-body">

          {loading && (
            <div className="api-card">
              <div className="animate-pulse space-y-3">
                <div className="h-5 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-300 dark:border-red-800 bg-red-100/80 dark:bg-red-900/25 p-5">
              <p className="text-red-800 dark:text-red-200 font-semibold">Unable to load team data</p>
              <p className="text-red-700 dark:text-red-300 text-sm mt-1">{error.message}</p>
            </div>
          )}

          {!loading && !error && !hasData && (
            <div className="api-card">
                <p className="text-black">No team or station data found.</p>
            </div>
          )}

          {!loading && !error && team && (
            <div className="api-card">
              <p className="text-2xl font-semibold text-black">{team.name}</p>
              {team.description && (
                <p className="mt-2 text-black">{team.description}</p>
              )}
              {team.members !== undefined && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-900/15 bg-white px-3 py-1 text-sm text-black">
                  <span className="font-semibold">{team.members}</span>
                  <span>members</span>
                </div>
              )}
            </div>
          )}

          {!loading && !error && stations.length > 0 && (
            <div>
              <p className="mb-4 text-sm uppercase tracking-wide text-black">Station Results</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {stations.map((station) => (
                  <div
                    key={station.stationId}
                    className="api-card"
                  >
                    <p className="text-lg font-semibold text-black">
                      {station.stationNumber ? `Station ${station.stationNumber}` : `Station ${station.stationId}`}
                    </p>
                    <p className="mt-1 text-black">{station.stationName}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-slate-900/15 bg-white px-3 py-1 text-xs text-black">
                        Result ID: {station.resultId ?? 'Pending'}
                      </span>
                      <span className="rounded-full border border-slate-900/15 bg-white px-3 py-1 text-xs text-black">
                        Time: {station.seconds !== null && station.seconds !== undefined ? `${station.seconds}s` : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && !error && classTeams.length > 0 && (
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-black">Class Team List</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {classTeams.map((classTeam) => (
                  <div
                    key={classTeam.teamId}
                    className="api-card"
                  >
                    <p className="text-lg font-semibold text-black">
                      {classTeam.teamNumber !== undefined ? `Team ${classTeam.teamNumber}` : `Team ID ${classTeam.teamId}`}
                    </p>
                    <p className="mt-2 text-sm text-black">
                      Class: {classTeam.className ?? classTeam.classId ?? 'Unknown'}
                    </p>
                    <p className="text-sm text-black">
                      School: {classTeam.schoolName ?? classTeam.schoolId ?? 'Unknown'}
                    </p>
                    <p className="mt-3 text-xs text-black">
                      Team ID: {classTeam.teamId}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
