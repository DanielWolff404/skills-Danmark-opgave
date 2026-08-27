import Events from '@/components/Events';
import EventSchools from '@/components/EventSchools';
import ClassStations from '@/components/ClassStations';

export default function Skole() {
  return (
    <div className="min-h-screen" style={{ backgroundImage: "url('/background.png')", backgroundSize: 'contain', backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat' }}>
      <div className="min-h-screen bg-linear-to-br from-white/90 via-slate-100/85 to-teal-50/80 dark:from-gray-700/80 dark:via-gray-600/75 dark:to-gray-700/80">
        <section className="px-4 pb-10 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-2xl sm:px-10 sm:py-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-teal-300">
                  Skills-konkurrence
                </p>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Læreroversigt</h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                  Få overblik over events, deltagende skoler og klassernes fremskridt i ét roligt workspace.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:max-w-xs">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-300">Workspace</p>
                  <p className="mt-2 text-lg font-semibold">Lærervisning</p>
                </div>
                <div className="rounded-2xl border border-teal-300/30 bg-teal-400/15 p-4">
                  <p className="text-xs uppercase tracking-wide text-teal-200">Status</p>
                  <p className="mt-2 text-lg font-semibold">Live data</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Schools Section */}
        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-xl sm:p-8">
            <EventSchools eventId={1} title="Deltagende skoler (event 1)" embedded={false} />
          </div>
        </section>

        {/* Events Section */}
        <section className="border-y border-slate-900/10 bg-white/35">
          <Events />
        </section>

        {/* Class Competition Section */}
        <ClassStations classId={1} title="Skills-event for klasse 1" />
      </div>
    </div>
  );
}
