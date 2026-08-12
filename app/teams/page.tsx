import ClassTeams from '@/components/ClassTeams';
import ClassSearch from '@/components/ClassSearch';

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
      <div className="min-h-screen bg-linear-to-br from-white/90 via-zinc-100/85 to-white/90 dark:from-gray-700/80 dark:via-gray-600/75 dark:to-gray-700/80">
        <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <ClassTeams schoolId={1} title="Class Teams by School" />
        <ClassSearch />
        </section>

      </div>
    </div>
  );
}
