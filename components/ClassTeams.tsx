'use client';

import { useMemo } from 'react';
import { useClassesBySchool } from '@/hooks/useCompetitionApi';

type ApiClassTeam = {
  class_id?: number | string;
  school_id?: number | string;
  name?: string;
  teacher_name?: string;
};

type ClassTeamItem = {
  classId: number;
  schoolId: number;
  name: string;
  teacherName: string;
};

type ClassTeamsProps = {
  schoolId: number | string;
  title?: string;
};

export default function ClassTeams({
  schoolId,
  title = 'Class Teams by School',
}: ClassTeamsProps) {
  const { data, isLoading: loading, error } = useClassesBySchool(schoolId);
  const classes = useMemo<ClassTeamItem[]>(() => {
    const rawClasses: ApiClassTeam[] = Array.isArray(data)
      ? data
      : Array.isArray((data as { classes?: ApiClassTeam[] } | undefined)?.classes)
        ? (data as { classes: ApiClassTeam[] }).classes
        : [];

    return rawClasses.map((item, index) => {
      const classId = Number(item.class_id);
      const parsedSchoolId = Number(item.school_id);
      return {
        classId: Number.isFinite(classId) ? classId : index,
        schoolId: Number.isFinite(parsedSchoolId) ? parsedSchoolId : Number(schoolId),
        name: item.name || 'Unnamed Class',
        teacherName: item.teacher_name || 'Unknown Teacher',
      };
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [data, schoolId]);

  return (
    <section className="pb-16 px-4 sm:px-6 lg:px-8">
      <div className="api-panel mx-auto max-w-7xl overflow-hidden">
        <div className="api-panel-header">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-semibold text-gray-800 sm:text-3xl">{title}</h2>
            <div className="api-pill">
              school_id={schoolId}
            </div>
          </div>
        </div>

        <div className="api-panel-body">
          {loading && (
            <p className="text-gray-800">Loading class teams...</p>
          )}

          {error && (
            <div className="rounded-2xl border border-red-300 dark:border-red-800 bg-red-100/80 dark:bg-red-900/25 p-5">
              <p className="text-red-800 dark:text-red-200 font-semibold">Unable to load class teams</p>
              <p className="text-red-700 dark:text-red-300 text-sm mt-1">{error.message}</p>
            </div>
          )}

          {!loading && !error && classes.length === 0 && (
            <p className="text-gray-800">No classes found for this school.</p>
          )}

          {!loading && !error && classes.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {classes.map((classItem) => (
                <div
                  key={classItem.classId}
                  className="api-card"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">Class</p>
                    <span className="api-pill">Active</span>
                  </div>
                  <p className="mt-2 text-2xl font-semibold text-gray-800">{classItem.name}</p>
                  <p className="mt-3 text-gray-800">Teacher: {classItem.teacherName}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-slate-900/15 bg-white px-3 py-1 text-xs text-gray-800">class_id={classItem.classId}</span>
                    <span className="rounded-full border border-slate-900/15 bg-white px-3 py-1 text-xs text-gray-800">school_id={classItem.schoolId}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
