import { Fraunces, Space_Grotesk } from 'next/font/google';

const titleFont = Fraunces({ subsets: ['latin'], variable: '--font-title' });
const bodyFont = Space_Grotesk({ subsets: ['latin'], variable: '--font-body' });

export default function Home() {
  const features = [
    {
      label: 'TM',
      title: 'Live Team Rooms',
      description: 'Coordinate classes, teams, and mentors with a shared space built for fast event days.',
    },
    {
      label: 'LR',
      title: 'Learning Tracks',
      description: 'Bundle tasks, resources, and guidance into clear learning paths for every grade.',
    },
    {
      label: 'OP',
      title: 'Ops Dashboard',
      description: 'Get one operational view of classes, schools, stations, and progress without context switching.',
    },
    {
      label: 'IN',
      title: 'Insight Feed',
      description: 'Surface results and participation trends as they happen so teachers can act early.',
    },
  ];

  const stats = [
    { value: '120+', label: 'Schools Connected' },
    { value: '3.4k', label: 'Students Active Weekly' },
    { value: '98%', label: 'Event Completion Rate' },
  ];

  return (
    <div
      className={`${titleFont.variable} ${bodyFont.variable} relative min-h-screen overflow-hidden bg-[#f3efe6] text-slate-900`}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(6,95,70,0.18),transparent_45%),radial-gradient(circle_at_84%_8%,rgba(249,115,22,0.2),transparent_40%),radial-gradient(circle_at_80%_82%,rgba(2,132,199,0.18),transparent_45%)]" />
        <div className="absolute -top-20 left-1/2 h-112 w-md -translate-x-1/2 rounded-full border border-slate-900/10" />
        <div className="absolute bottom-8 right-8 h-16 w-16 rounded-full bg-slate-900/10" />
      </div>

      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pt-24">
        <section className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-slate-900/20 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 backdrop-blur">
              Education Coordination Platform
            </p>
            <h1
              className="text-5xl font-semibold leading-[0.95] text-slate-900 sm:text-6xl lg:text-7xl"
              style={{ fontFamily: 'var(--font-title)' }}
            >
              Run School Events
              <span className="block text-teal-800">With Clarity and Energy.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-700 sm:text-xl">
              Skills brings teams, classes, and stations into one focused command center. From kickoff to final result,
              every step stays visible, collaborative, and easy to manage.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button className="rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-slate-800">
                Start New Event
              </button>
              <button className="rounded-full border border-slate-900/30 bg-white/70 px-7 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-900 backdrop-blur transition-colors duration-200 hover:bg-white">
                Explore Platform
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-900/10 bg-white/70 p-6 shadow-[0_20px_60px_-30px_rgba(2,6,23,0.45)] backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Today at a glance</h2>
              <span className="rounded-full bg-emerald-700/10 px-3 py-1 text-xs font-medium text-emerald-800">Live</span>
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Next station handoff</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">8.A to Station 4 in 03:20</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Teacher alert</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">2 teams need score review</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Attendance</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">91% checked in</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-900/10 bg-white/75 p-5 backdrop-blur">
              <p className="text-3xl font-semibold text-slate-900" style={{ fontFamily: 'var(--font-title)' }}>
                {stat.value}
              </p>
              <p className="mt-1 text-sm uppercase tracking-[0.14em] text-slate-600">{stat.label}</p>
            </div>
          ))}
        </section>

        <section className="mt-16">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl" style={{ fontFamily: 'var(--font-title)' }}>
                Built for fast school days
              </h2>
              <p className="mt-2 max-w-2xl text-slate-700">
                Core tools designed to keep event flow smooth for students, staff, and administrators.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => (
              <article
                key={feature.title}
                className="opacity-0 rounded-2xl border border-slate-900/10 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 motion-safe:animate-[fadeInUp_700ms_ease-out_forwards]"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold tracking-[0.12em] text-white">
                  {feature.label}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-slate-700">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-slate-900/10 bg-white/75 p-4 shadow-sm backdrop-blur sm:p-6">
          <div className="mb-5 px-2 sm:px-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">See Skills in action</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl" style={{ fontFamily: 'var(--font-title)' }}>
              A clearer way to run the day
            </h2>
          </div>
          <div className="aspect-video overflow-hidden rounded-2xl bg-slate-900">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/XHOmBV4js_E"
              title="Skoleting introduction video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-slate-900/10 bg-linear-to-r from-teal-800 via-cyan-800 to-slate-900 p-8 sm:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl" style={{ fontFamily: 'var(--font-title)' }}>
                Ready for your next competition day?
              </h2>
              <p className="mt-2 max-w-xl text-cyan-100">
                Launch your event workspace and keep every class, station, and team in sync from minute one.
              </p>
            </div>
            <button className="rounded-full bg-white px-7 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-900 transition-colors hover:bg-cyan-50">
              Create Workspace
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
