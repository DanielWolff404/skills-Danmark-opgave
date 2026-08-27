import ClassStations from '@/components/ClassStations';
import TeamDetails from '@/components/TeamDetails';

export default function LearningWorkspace() {
  const topics = [
    {
      title: 'Matematikværksted',
      description: 'Øv problemløsning med guidede øvelser og hurtig feedback.',
      level: 'Begynder til avanceret',
      icon: 'ML',
    },
    {
      title: 'Naturfagsstudio',
      description: 'Udforsk eksperimenter, simuleringer og virkelige naturfagsprojekter.',
      level: 'Alle niveauer',
      icon: 'SS',
    },
    {
      title: 'Sprogcenter',
      description: 'Styrk læse- og skrivefærdigheder med engagerende aktiviteter.',
      level: 'Øvet',
      icon: 'LH',
    },
    {
      title: 'Kreativt værksted',
      description: 'Design, skab og præsenter idéer med visuelle og digitale værktøjer.',
      level: 'Projektbaseret',
      icon: 'CW',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3efe6] text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_12%,rgba(6,95,70,0.16),transparent_38%),radial-gradient(circle_at_88%_8%,rgba(249,115,22,0.14),transparent_34%),radial-gradient(circle_at_80%_88%,rgba(2,132,199,0.12),transparent_42%)]" />
      <section className="px-4 pb-12 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-3xl border border-slate-700 bg-slate-950 p-8 text-white shadow-2xl sm:p-12 lg:grid-cols-[1fr_0.65fr] lg:items-end">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-slate-900/20 bg-white/75 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-800 sm:text-sm">Læringscenter</p>
            <h1 className="text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
              Lære
              <span className="block text-teal-300">Lær med formål.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-700 sm:text-xl">Find fokuserede læringsforløb, der styrker færdigheder, selvtillid og kreativitet.</p>
          </div>
          <div className="rounded-2xl border border-slate-900/10 bg-slate-900 p-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">Læringsrytme</p>
            <p className="mt-2 text-2xl font-semibold">Lær. Brug. Konkurrér.</p>
            <p className="mt-2 text-sm text-slate-300">Byg et stærkt fundament, og afprøv det derefter i konkurrence-workspacet.</p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Vælg dit forløb</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">Fire måder at udvikle sig på</h2>
            </div>
            <span className="hidden rounded-full border border-slate-900/15 bg-white/70 px-3 py-1 text-sm text-slate-700 sm:inline-flex">4 læringsforløb</span>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {topics.map((topic) => (
            <div key={topic.title} className="group rounded-2xl border border-slate-900/10 border-l-4 border-l-teal-700 bg-white/85 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold tracking-[0.12em] text-white">{topic.icon}</div>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Forløb</span>
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-slate-900">{topic.title}</h2>
              <p className="mt-2 max-w-xl text-slate-700">{topic.description}</p>
              <div className="mt-5 inline-flex items-center rounded-full border border-teal-800/25 bg-teal-800/10 px-3 py-1 text-sm font-medium text-teal-900">{topic.level}</div>
            </div>
          ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-3 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl border-t border-slate-900/10 pt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Live konkurrencedata</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">Sæt læringen i spil</h2>
          <p className="mt-2 max-w-2xl text-slate-700">Følg hold, stationsresultater og klassens fremskridt gennem dagen.</p>
        </div>
      </section>

      <TeamDetails classId={1} title="Hold i klasse 1" />

      <section className="px-4 pt-2 sm:px-6 lg:px-8">
        <div className="mx-auto mb-2 max-w-7xl">
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Holdoversigt</h2>
          <p className="mt-1 text-slate-700">Live stationsresultater for det valgte hold.</p>
        </div>
      </section>

      <TeamDetails teamId={1} title="Holdresultater" />
      <ClassStations classId={1} title="Konkurrenceoversigt for klasse 1" />
    </div>
  );
}
