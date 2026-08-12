import StationsList from '@/components/StationsList';

export default function Stations() {
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
      <div className="min-h-screen bg-linear-to-br from-white/90 via-zinc-100/85 to-white/90 dark:from-gray-700/80 dark:via-gray-600/75 dark:to-gray-700/80">
        <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-3xl border border-white/40 bg-white/60 dark:bg-gray-900/40 backdrop-blur-md p-8 sm:p-12 shadow-xl">
              <p className="uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Skills Competition
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Stations
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-black to-gray-500 dark:from-white dark:to-gray-300">
                  Live Overview
                </span>
              </h1>
              <p className="mt-4 text-lg text-gray-700 dark:text-gray-200 max-w-2xl">
                Live station list pulled directly from the API endpoint.
              </p>
            </div>
          </div>
        </section>

        <StationsList />
      </div>
    </div>
  );
}
