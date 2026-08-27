import TeamDetails from '@/components/TeamDetails';
import ClassTeams from '@/components/ClassTeams';

export default function Teams() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="min-h-screen bg-linear-to-br from-white/90 via-slate-100/85 to-teal-50/80 dark:from-gray-700/80 dark:via-gray-600/75 dark:to-gray-700/80">
        <main>
          <section className="px-4 pb-10 pt-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-2xl sm:px-10 sm:py-12">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="max-w-3xl">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-teal-300">
                    Skills-konkurrence
                  </p>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                    Hold og klasser
                  </h1>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                    Se holdenes fremskridt, stationsresultater og de deltagende klasser samlet ét sted.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:max-w-xs">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-300">Visning</p>
                    <p className="mt-2 text-lg font-semibold">Live hold</p>
                  </div>
                  <div className="rounded-2xl border border-teal-300/30 bg-teal-400/15 p-4">
                    <p className="text-xs uppercase tracking-wide text-teal-200">Skole</p>
                    <p className="mt-2 text-lg font-semibold">Skole 4</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-4">
            <TeamDetails classId={1} teamId={1} title="Oversigt for hold 1" />
          </section>

          <section className="pb-12">
            <ClassTeams schoolId={4} title="Klasser på skole 4" />
          </section>
        </main>
      </div>
    </div>
  );
}
