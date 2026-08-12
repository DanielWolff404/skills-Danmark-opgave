'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Team', href: '/teams' },
    { name: 'Stations', href: '/stations' },
    { name: 'Skole', href: '/skole' },
    { name: 'Admin', href: '/admin' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-950/80 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="text-3xl font-bold text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-200 transition-all">
              Skills
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-base font-medium transition-all duration-200 ${
                  item.name === 'Admin'
                    ? `rounded-full border px-4 py-2 ${
                        isAdminRoute
                          ? 'border-teal-800 bg-teal-800 text-white shadow-md'
                          : 'border-teal-800/40 bg-teal-800/10 text-teal-900 hover:bg-teal-800 hover:text-white'
                      }`
                    : `rounded-md px-2 py-1 ${
                        pathname === item.href
                          ? 'text-black dark:text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
                      }`
                }`}
              >
                {item.name}
                {item.name !== 'Admin' && (
                  <span
                    className={`absolute -bottom-0.5 left-0 h-0.5 bg-linear-to-r from-black to-gray-800 transition-all duration-300 ${
                      pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button className="px-6 py-2 rounded-lg bg-linear-to-r from-black to-gray-800 text-white font-medium hover:shadow-lg hover:shadow-black/50 transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
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
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                  item.name === 'Admin' && isAdminRoute
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
            <button className="w-full mt-4 px-4 py-2 rounded-lg bg-linear-to-r from-black to-gray-800 text-white font-medium hover:shadow-lg transition-all duration-300">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
