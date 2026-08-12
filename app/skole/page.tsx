import Events from '@/components/Events';
import EventSchools from '@/components/EventSchools';
import ClassStations from '@/components/ClassStations';

export default function Skole() {
  return (
    <div className="min-h-screen" style={{backgroundImage: "url('/background.png')", backgroundSize: 'contain', backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat'}}>
      <div className="min-h-screen bg-linear-to-br from-white/90 via-zinc-100/85 to-white/90 dark:from-gray-700/80 dark:via-gray-600/75 dark:to-gray-700/80">
        {/* Header Section */}
        <section className="relative overflow-hidden pt-20 pb-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto rounded-3xl border border-white/40 bg-white/60 dark:bg-gray-900/40 backdrop-blur-md p-8 sm:p-12 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
              <div className="lg:col-span-2">
                <p className="uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Skills Competition
                </p>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                  Event School
                  <span className="block text-transparent bg-clip-text bg-linear-to-r from-black to-gray-500 dark:from-white dark:to-gray-300">
                    Command Center
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 max-w-3xl">
                  Follow live Skills events, participating schools, and class station results in one unified view.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-black text-white p-5 shadow-lg">
                  <p className="text-sm uppercase tracking-wide text-gray-200">Focus</p>
                  <p className="text-xl font-semibold mt-1">Live Event Tracking</p>
                </div>
                <div className="rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 p-5">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Coverage</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white mt-1">Schools + Events + Results</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Schools Section */}
        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto p-8 bg-white/92 dark:bg-gray-800/92 backdrop-blur-sm rounded-3xl border border-gray-300 dark:border-gray-700 shadow-xl">
            <EventSchools eventId={1} title="Participating Schools (Event 1)" embedded={false} />
          </div>
        </section>

        {/* Events Section */}
        <Events />

        {/* Class Competition Section */}
        <ClassStations classId={1} title="Class 1 Skills Event Board" />
      </div>
    </div>
  );
}
