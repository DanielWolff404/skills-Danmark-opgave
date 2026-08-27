'use client';

import { useState } from 'react';
import { Fraunces, Space_Grotesk } from 'next/font/google';
import ClassCreateForm from '../../components/ClassCreateForm';
import TeamCreateForm from '../../components/TeamCreateForm';
import EventCreateForm from '../../components/EventCreateForm';
import SchoolCreateForm from '../../components/SchoolCreateForm';
import ResultCreateForm from '../../components/ResultCreateForm';
import LearningWorkspace from '../../components/LearningWorkspace';
import TeamDetails from '../../components/TeamDetails';

const titleFont = Fraunces({ subsets: ['latin'], variable: '--font-title' });
const bodyFont = Space_Grotesk({ subsets: ['latin'], variable: '--font-body' });

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [apiRateLimiting, setApiRateLimiting] = useState(true);
  const [requestsPerHour, setRequestsPerHour] = useState('1000');

  const tabs = [
    { id: 'dashboard', label: 'Oversigt' },
    { id: 'users', label: 'Brugere' },
    { id: 'teams', label: 'Hold' },
    { id: 'settings', label: 'Indstillinger' },
    { id: 'learning', label: 'Læringsværktøjer' },
  ];

  const stats = [
    { label: 'Brugere i alt', value: '2,543', icon: 'US' },
    { label: 'Aktive elever', value: '1,876', icon: 'ST' },
    { label: 'Lærere', value: 'TC', icon: 'TC' },
    { label: 'Hold', value: '48', icon: 'TM' },
  ];

  const recentActivity = [
    { user: 'John Doe', action: 'Kom med på hold Alpha', time: '2 timer siden' },
    { user: 'Sarah Smith', action: 'Gennemførte modul 5', time: '4 timer siden' },
    { user: 'Mike Johnson', action: 'Skrev i diskussionen', time: '6 timer siden' },
    { user: 'Emma Wilson', action: 'Indsendte opgave', time: '8 timer siden' },
    { user: 'Alex Brown', action: 'Tilmeldte sig platformen', time: '1 dag siden' },
  ];

  const users = [
    { id: 1, name: 'John Doe', email: 'john@skoleting.com', role: 'Student', team: 'Alpha', status: 'Active' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@skoleting.com', role: 'Teacher', team: 'Education', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@skoleting.com', role: 'Admin', team: 'Operations', status: 'Active' },
    { id: 4, name: 'Emma Wilson', email: 'emma@skoleting.com', role: 'Student', team: 'Design', status: 'Inactive' },
    { id: 5, name: 'Alex Brown', email: 'alex@skoleting.com', role: 'Student', team: 'Support', status: 'Active' },
  ];

  return (
    <div className={`${titleFont.variable} ${bodyFont.variable} relative min-h-screen overflow-hidden bg-[#f3efe6] text-black`} style={{ fontFamily: 'var(--font-body)' }}>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,rgba(6,95,70,0.16),transparent_38%),radial-gradient(circle_at_90%_5%,rgba(249,115,22,0.14),transparent_34%),radial-gradient(circle_at_80%_90%,rgba(2,132,199,0.12),transparent_42%)]" />
      <header className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="flex flex-col gap-6 border-b border-slate-900/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-slate-900/20 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-black backdrop-blur">Driftsworkspace</p>
            <h1 className="text-5xl font-semibold leading-none text-black sm:text-6xl" style={{ fontFamily: 'var(--font-title)' }}>Administrationspanel</h1>
            <p className="mt-4 max-w-xl text-lg text-black">Håndtér brugere, hold, events og platformindstillinger fra ét samlet overblik.</p>
          </div>
          <div className="w-full rounded-2xl border border-slate-900/10 bg-white/70 px-5 py-4 backdrop-blur sm:w-auto sm:min-w-56">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black">Systemstatus</p>
            <p className="mt-1 flex items-center gap-2 font-semibold text-emerald-800"><span className="h-2 w-2 rounded-full bg-emerald-600" />Alle systemer fungerer</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        {/* Tabs */}
        <nav aria-label="Admin sections" className="mb-10 overflow-x-auto rounded-2xl border border-slate-900/10 bg-white/65 p-2 backdrop-blur">
          <div className="flex min-w-max gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-current={activeTab === tab.id ? 'page' : undefined}
                className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-700/40 ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'text-black hover:bg-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="flex flex-col gap-5 rounded-3xl bg-slate-950 p-6 text-white shadow-xl sm:flex-row sm:items-end sm:justify-between sm:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">I dag kort fortalt</p>
                <h2 className="mt-2 text-3xl font-semibold text-white" style={{ fontFamily: 'var(--font-title)' }}>Hold skolen i gang</h2>
                <p className="mt-2 max-w-2xl text-slate-300">Følg det vigtigste, og gå direkte til det område, der kræver opmærksomhed.</p>
              </div>
              <button type="button" onClick={() => setActiveTab('teams')} className="w-full rounded-xl bg-teal-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-teal-300 sm:w-auto">Håndtér hold</button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`rounded-2xl border bg-white/80 p-6 shadow-sm backdrop-blur transition-transform hover:-translate-y-1 ${index === 0 ? 'border-l-4 border-l-slate-900' : index === 1 ? 'border-l-4 border-l-teal-700' : index === 2 ? 'border-l-4 border-l-amber-500' : 'border-l-4 border-l-cyan-700'}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold tracking-[0.12em] text-white">{stat.icon}</span>
                    <span className="text-3xl font-semibold text-black" style={{ fontFamily: 'var(--font-title)' }}>{stat.value}</span>
                  </div>
                  <p className="text-sm uppercase tracking-[0.12em] text-black">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
              <div className="rounded-2xl border border-slate-900/10 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-8">
                <div className="mb-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">Aktivitetsfeed</p>
                    <h2 className="mt-2 text-3xl font-semibold text-black" style={{ fontFamily: 'var(--font-title)' }}>Seneste aktivitet</h2>
                  </div>
                  <span className="hidden text-sm text-black sm:inline">Sidste 24 timer</span>
                </div>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex gap-4 rounded-xl border border-slate-900/10 bg-[#f8f5ee] p-4 transition-colors hover:bg-white">
                      <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-900 text-xs font-semibold text-white">{activity.user.split(' ').map((name) => name[0]).join('')}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-4">
                          <p className="font-semibold text-black">{activity.user}</p>
                          <span className="text-sm text-black">{activity.time}</span>
                        </div>
                        <p className="mt-1 text-sm text-black">{activity.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-900/10 bg-slate-900 p-6 text-white shadow-sm sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-200">Hurtige handlinger</p>
                <h2 className="mt-2 text-2xl font-semibold" style={{ fontFamily: 'var(--font-title)' }}>Gå direkte til arbejdet</h2>
                <div className="mt-6 space-y-3">
                  <button type="button" onClick={() => setActiveTab('users')} className="w-full rounded-xl border border-white/20 px-4 py-3 text-left text-sm font-semibold transition-colors hover:bg-white/10">Gennemse brugere <span className="float-right">-&gt;</span></button>
                  <button type="button" onClick={() => setActiveTab('teams')} className="w-full rounded-xl border border-white/20 px-4 py-3 text-left text-sm font-semibold transition-colors hover:bg-white/10">Opret et hold <span className="float-right">-&gt;</span></button>
                  <button type="button" onClick={() => setActiveTab('settings')} className="w-full rounded-xl border border-white/20 px-4 py-3 text-left text-sm font-semibold transition-colors hover:bg-white/10">Tjek indstillinger <span className="float-right">-&gt;</span></button>
                </div>
              </div>
            </div>
            <EventCreateForm />
            <SchoolCreateForm />
            <ResultCreateForm />
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="rounded-2xl border border-slate-900/10 bg-white/80 p-5 shadow-sm backdrop-blur sm:p-8">
            <div className="mb-6 flex flex-col gap-4 border-b border-slate-900/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">Directory</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900" style={{ fontFamily: 'var(--font-title)' }}>User management</h2>
                <p className="mt-2 text-black">Review roles, teams, and account status in one place.</p>
              </div>
              <button type="button" className="api-button w-full sm:w-auto">
                Add User
              </button>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-900/10">
              <table className="w-full min-w-190">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-6 py-3 text-left font-semibold text-black">Name</th>
                    <th className="px-6 py-3 text-left font-semibold text-black">Email</th>
                    <th className="px-6 py-3 text-left font-semibold text-black">Role</th>
                    <th className="px-6 py-3 text-left font-semibold text-black">Team</th>
                    <th className="px-6 py-3 text-left font-semibold text-black">Status</th>
                    <th className="px-6 py-3 text-left font-semibold text-black">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 font-medium text-black">{user.name}</td>
                      <td className="px-6 py-4 text-black">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-gray-200 text-black dark:bg-gray-700 dark:text-white rounded-full text-sm font-medium">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full border border-teal-800/30 bg-teal-800/10 px-3 py-1 text-sm font-medium text-teal-900">
                          {user.team}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.status === 'Active'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        <button type="button" className="font-medium text-sm text-black underline-offset-4 hover:underline">Edit</button>
                        <button type="button" className="font-medium text-sm text-red-600 underline-offset-4 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <TeamDetails classId={1} title="Teams from API" embedded />
          </div>
        )}

        {/* Teams Tab */}
        {activeTab === 'teams' && (
          <div className="rounded-2xl border border-slate-900/10 bg-white/80 p-5 shadow-sm backdrop-blur sm:p-8">
            <div className="mb-6 flex flex-col gap-4 border-b border-slate-900/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">Competition structure</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900" style={{ fontFamily: 'var(--font-title)' }}>Teams management</h2>
                <p className="mt-2 text-black">Organize teams and add new classes from the same workspace.</p>
              </div>
              <button type="button" className="api-button w-full sm:w-auto">
                Create Team
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Development', members: 12, projects: 5 },
                { name: 'Design', members: 8, projects: 3 },
                { name: 'Education', members: 15, projects: 7 },
                { name: 'Support', members: 10, projects: 4 },
                { name: 'Marketing', members: 6, projects: 3 },
                { name: 'Research', members: 9, projects: 6 },
              ].map((team, index) => (
                <div key={index} className="flex flex-col rounded-2xl border border-slate-900/10 bg-[#f8f5ee] p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="mb-4 text-xl font-semibold text-slate-900">{team.name}</h3>
                  <div className="space-y-2 mb-4">
                  <p className="text-black">Members: <span className="font-semibold">{team.members}</span></p>
                  <p className="text-black">Projects: <span className="font-semibold">{team.projects}</span></p>
                  </div>
                  <button type="button" className="mt-auto w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800">
                    Manage
                  </button>
                </div>
              ))}
            </div>
            <ClassCreateForm />
            <TeamCreateForm />
          </div>
        )}

        {activeTab === 'learning' && <LearningWorkspace />}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="rounded-2xl border border-slate-900/10 bg-white/80 p-5 shadow-sm backdrop-blur sm:p-8">
            <div className="mb-8 border-b border-slate-900/10 pb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">Workspace preferences</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900" style={{ fontFamily: 'var(--font-title)' }}>Platform settings</h2>
              <p className="mt-2 text-black">Control operational behavior for the admin workspace.</p>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-900/10 bg-[#f8f5ee] p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold text-black">Maintenance Mode</h3>
                  <button type="button" aria-pressed={maintenanceMode} onClick={() => setMaintenanceMode((value) => !value)} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${maintenanceMode ? 'bg-amber-600 text-white' : 'bg-slate-900 text-white hover:bg-teal-800'}`}>
                    {maintenanceMode ? 'On' : 'Off'}
                  </button>
                </div>
                <p className="text-black">Enable maintenance mode to perform system updates</p>
              </div>
              <div className="rounded-2xl border border-slate-900/10 bg-[#f8f5ee] p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold text-black">Email Notifications</h3>
                  <button type="button" aria-pressed={emailNotifications} onClick={() => setEmailNotifications((value) => !value)} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${emailNotifications ? 'bg-emerald-700 text-white' : 'bg-slate-900 text-white hover:bg-teal-800'}`}>
                    {emailNotifications ? 'On' : 'Off'}
                  </button>
                </div>
                <p className="text-black">Require 2FA for all admin accounts</p>
              </div>
              <div className="rounded-2xl border border-slate-900/10 bg-[#f8f5ee] p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold text-black">API Rate Limiting</h3>
                  <button type="button" aria-pressed={apiRateLimiting} onClick={() => setApiRateLimiting((value) => !value)} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${apiRateLimiting ? 'bg-emerald-700 text-white' : 'bg-slate-900 text-white hover:bg-teal-800'}`}>
                    {apiRateLimiting ? 'On' : 'Off'}
                  </button>
                </div>
                <p className="text-black">Require 2FA for all admin accounts</p>
              </div>
              <div className="rounded-2xl border border-slate-900/10 bg-[#f8f5ee] p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold text-black">API Rate Limiting</h3>
                  <label className="flex items-center gap-3 text-sm font-semibold text-black">
                    <span className="sr-only">Requests per hour</span>
                    <input type="number" min="1" value={requestsPerHour} onChange={(event) => setRequestsPerHour(event.target.value)} className="api-input mt-0 w-full sm:w-32" />
                  </label>
                </div>
                <p className="text-black">Requests per hour per user</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
