'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCompetitionOpen, setIsCompetitionOpen] = useState(false);
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');
  const isCompetitionRoute = pathname === '/teams' || pathname === '/stations';

  const menuItems = [
    { name: 'Hjem', href: '/' },
    { name: 'Læreroversigt', href: '/skole' },
    { name: 'Administration', href: '/admin' },
  ];

  const competitionItems = [
    { name: 'Hold', href: '/teams' },
    { name: 'Stationer', href: '/stations' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/85 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-gray-950/85">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center gap-2.5 text-gray-900 dark:text-white">
              
              <span className="text-2xl font-bold tracking-tight">Skills</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                pathname === '/' ? 'bg-slate-950 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
              }`}
            >
              Hjem
            </Link>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCompetitionOpen(!isCompetitionOpen)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  isCompetitionRoute ? 'bg-slate-950 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                }`}
                aria-expanded={isCompetitionOpen}
                aria-haspopup="menu"
              >
                Konkurrence <span className="ml-1 text-sm">{isCompetitionOpen ? '^' : 'v'}</span>
              </button>
              {isCompetitionOpen && (
                <div className="absolute left-0 top-full z-10 mt-3 w-48 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-900" role="menu">
                  <div className="mb-1 flex items-center justify-between border-b border-gray-200 px-3 py-2 dark:border-gray-700">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Konkurrence</span>
                    <button
                      type="button"
                      onClick={() => setIsCompetitionOpen(false)}
                      className="rounded-md px-2 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                      aria-label="Luk konkurrencemenu"
                    >
                      Luk
                    </button>
                  </div>
                  {competitionItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        pathname === item.href
                          ? 'bg-black text-white'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                      }`}
                      onClick={() => setIsCompetitionOpen(false)}
                      role="menuitem"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {menuItems.filter((item) => item.name !== 'Hjem').map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm font-semibold transition-all duration-200 ${
                  item.name === 'Administration'
                    ? `rounded-full border px-4 py-2 ${
                        isAdminRoute
                          ? 'border-teal-800 bg-teal-800 text-white shadow-md'
                          : 'border-teal-800/40 bg-teal-800/10 text-teal-900 hover:bg-teal-800 hover:text-white'
                      }`
                    : `rounded-lg px-3 py-2 ${
                        pathname === item.href
                          ? 'bg-slate-950 text-white shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                      }`
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Åbn eller luk menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-2 pt-2 pb-4 space-y-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <Link
              href="/"
              className={`block rounded-lg px-4 py-2 text-base font-medium transition-colors ${
                pathname === '/' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Hjem
            </Link>
            <button
              type="button"
              onClick={() => setIsCompetitionOpen(!isCompetitionOpen)}
              className={`flex w-full items-center justify-between rounded-lg px-4 py-2 text-left text-base font-medium transition-colors ${
                isCompetitionRoute ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
              }`}
              aria-expanded={isCompetitionOpen}
            >
              <span>Konkurrence</span>
              <span className="text-sm">{isCompetitionOpen ? '^' : 'v'}</span>
            </button>
            {isCompetitionOpen && (
              <div className="space-y-2 border-l-2 border-teal-700 pl-3">
                <div className="flex items-center justify-between px-4 py-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Konkurrencemenu</span>
                  <button
                    type="button"
                    onClick={() => setIsCompetitionOpen(false)}
                    className="rounded-md px-2 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                    aria-label="Luk konkurrencemenu"
                  >
                    Luk
                  </button>
                </div>
                {competitionItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block rounded-lg px-4 py-2 text-base font-medium transition-colors ${
                      pathname === item.href
                        ? 'bg-black text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                    }`}
                    onClick={() => {
                      setIsOpen(false);
                      setIsCompetitionOpen(false);
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
            {menuItems.filter((item) => item.name !== 'Hjem').map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                  item.name === 'Administration' && isAdminRoute
                    ? 'bg-teal-800 text-white'
                    : pathname === item.href
                    ? 'bg-black text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
