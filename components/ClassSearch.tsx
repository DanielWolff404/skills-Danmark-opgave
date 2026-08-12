'use client';

import ClassStations from './ClassStations';

export default function ClassSearch() {
  const classId = '1';

  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-3xl border border-gray-300 bg-white/92 shadow-xl dark:border-gray-700 dark:bg-gray-800/92">
      
      </div>

      <ClassStations
        classId={classId}
        teamNumber={1}
        title="Class 1 - Team 1 Station Results"
      />
    </section>
  );
}
