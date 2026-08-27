'use client';

import { FormEvent, useState } from 'react';
import { Fraunces, Space_Grotesk } from 'next/font/google';
import { useRouter } from 'next/navigation';

const titleFont = Fraunces({ subsets: ['latin'], variable: '--font-title' });
const bodyFont = Space_Grotesk({ subsets: ['latin'], variable: '--font-body' });

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error || 'Could not sign in.');
      }

      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not sign in.');
      setLoading(false);
    }
  };

  return (
    <main className={`${titleFont.variable} ${bodyFont.variable} relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-[#f3efe6] px-4 text-black`} style={{ fontFamily: 'var(--font-body)' }}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(6,95,70,0.18),transparent_40%),radial-gradient(circle_at_85%_10%,rgba(249,115,22,0.16),transparent_36%)]" />
      <section className="relative w-full max-w-md rounded-3xl border border-slate-900/10 bg-white/85 p-8 shadow-[0_20px_60px_-30px_rgba(2,6,23,0.45)] backdrop-blur sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black">Skoleting admin</p>
        <h1 className="mt-3 text-4xl font-semibold leading-none text-black" style={{ fontFamily: 'var(--font-title)' }}>Log ind for at fortsætte</h1>
        <p className="mt-4 text-black">Brug dine administratoroplysninger for at åbne kontrolrummet.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm font-semibold text-black">
            Brugernavn
            <input
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-900/20 bg-white px-4 py-3 text-black outline-none focus:border-teal-800"
            />
          </label>
          <label className="block text-sm font-semibold text-black">
            Adgangskode
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-900/20 bg-white px-4 py-3 text-black outline-none focus:border-teal-800"
            />
          </label>
          <button type="submit" disabled={loading} className="w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? 'Logger ind...' : 'Log ind'}
          </button>
        </form>

        {error && <p className="mt-5 rounded-xl bg-red-100 p-3 text-sm font-medium text-red-900">{error}</p>}
      </section>
    </main>
  );
}
