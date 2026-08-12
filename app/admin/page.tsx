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
import QueryMonitor from '../../components/QueryMonitor';

const titleFont = Fraunces({ subsets: ['latin'], variable: '--font-title' });
const bodyFont = Space_Grotesk({ subsets: ['latin'], variable: '--font-body' });

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'Total Users', value: '2,543', icon: 'US' },
    { label: 'Active Students', value: '1,876', icon: 'ST' },
    { label: 'Teachers', value: 'TC', icon: 'TC' },
    { label: 'Teams', value: '48', icon: 'TM' },
  ];

  const recentActivity = [
    { user: 'John Doe', action: 'Joined Team Alpha', time: '2 hours ago' },
    { user: 'Sarah Smith', action: 'Completed Module 5', time: '4 hours ago' },
    { user: 'Mike Johnson', action: 'Posted in Discussion', time: '6 hours ago' },
    { user: 'Emma Wilson', action: 'Submitted Assignment', time: '8 hours ago' },
    { user: 'Alex Brown', action: 'Joined Platform', time: '1 day ago' },
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
            <p className="mb-3 inline-flex rounded-full border border-slate-900/20 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-black backdrop-blur">Operations workspace</p>
            <h1 className="text-5xl font-semibold leading-none text-black sm:text-6xl" style={{ fontFamily: 'var(--font-title)' }}>Admin control room</h1>
            <p className="mt-4 max-w-xl text-lg text-black">Keep people, teams, events, and platform settings moving from one calm operational view.</p>
          </div>
          <div className="rounded-2xl border border-slate-900/10 bg-white/70 px-5 py-4 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black">System status</p>
            <p className="mt-1 flex items-center gap-2 font-semibold text-emerald-800"><span className="h-2 w-2 rounded-full bg-emerald-600" />All systems operational</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="mb-10 flex flex-wrap gap-2 rounded-2xl border border-slate-900/10 bg-white/65 p-2 backdrop-blur">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
              activeTab === 'dashboard'
                ? 'bg-slate-900 text-white shadow-lg'
                : 'text-black hover:bg-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
              activeTab === 'users'
                ? 'bg-slate-900 text-white shadow-lg'
                : 'text-black hover:bg-white'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('teams')}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
              activeTab === 'teams'
                ? 'bg-slate-900 text-white shadow-lg'
                : 'text-black hover:bg-white'
            }`}
          >
            Teams
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
              activeTab === 'settings'
                ? 'bg-slate-900 text-white shadow-lg'
                : 'text-black hover:bg-white'
            }`}
          >
            Settings
          </button>
          <button
            onClick={() => setActiveTab('learning')}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
              activeTab === 'learning'
                ? 'bg-slate-900 text-white shadow-lg'
                : 'text-black hover:bg-white'
            }`}
          >
            lære operations
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-900/10 bg-white/80 p-6 shadow-sm backdrop-blur transition-transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold tracking-[0.12em] text-white">{stat.icon}</span>
                    <span className="text-3xl font-semibold text-black" style={{ fontFamily: 'var(--font-title)' }}>{stat.value}</span>
                  </div>
                  <p className="text-sm uppercase tracking-[0.12em] text-black">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl border border-slate-900/10 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-8">
              <h2 className="mb-6 text-3xl font-semibold text-black" style={{ fontFamily: 'var(--font-title)' }}>Recent activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-xl border border-slate-900/10 bg-[#f8f5ee] p-4 transition-colors hover:bg-white"
                  >
                    <div>
                      <p className="font-semibold text-black">{activity.user}</p>
                      <p className="text-sm text-black">{activity.action}</p>
                    </div>
                    <span className="text-sm text-black">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <QueryMonitor />
            <EventCreateForm />
            <SchoolCreateForm />
            <ResultCreateForm />
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="rounded-2xl border border-slate-900/10 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold text-slate-900" style={{ fontFamily: 'var(--font-title)' }}>User management</h2>
              <button className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700">
                Add User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
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
                        <button className="text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300 font-medium text-sm">Edit</button>
                        <button className="text-red-600 hover:text-red-700 font-medium text-sm">Delete</button>
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
          <div className="rounded-2xl border border-slate-900/10 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold text-slate-900" style={{ fontFamily: 'var(--font-title)' }}>Teams management</h2>
              <button className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700">
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
                <div key={index} className="rounded-2xl border border-slate-900/10 bg-[#f8f5ee] p-6">
                  <h3 className="mb-4 text-xl font-semibold text-slate-900">{team.name}</h3>
                  <div className="space-y-2 mb-4">
                  <p className="text-black">Members: <span className="font-semibold">{team.members}</span></p>
                  <p className="text-black">Projects: <span className="font-semibold">{team.projects}</span></p>
                  </div>
                  <button className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700">
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
          <div className="rounded-2xl border border-slate-900/10 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-8">
            <h2 className="mb-8 text-3xl font-semibold text-slate-900" style={{ fontFamily: 'var(--font-title)' }}>Platform settings</h2>
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-900/10 bg-[#f8f5ee] p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-black">Maintenance Mode</h3>
                  <button className="px-4 py-2 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors">
                    Off
                  </button>
                </div>
                <p className="text-black">Enable maintenance mode to perform system updates</p>
              </div>
              <div className="rounded-2xl border border-slate-900/10 bg-[#f8f5ee] p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-black">Email Notifications</h3>
                  <button className="px-4 py-2 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors">
                    On
                  </button>
                </div>
                <p className="text-black">Require 2FA for all admin accounts</p>
              </div>
              <div className="rounded-2xl border border-slate-900/10 bg-[#f8f5ee] p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-black">API Rate Limiting</h3>
                  <button className="px-4 py-2 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors">
                    On
                  </button>
                </div>
                <p className="text-black">Require 2FA for all admin accounts</p>
              </div>
              <div className="rounded-2xl border border-slate-900/10 bg-[#f8f5ee] p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-black">API Rate Limiting</h3>
                  <input type="number" defaultValue="1000" className="w-24 rounded-lg border border-gray-300 bg-white px-3 py-2 text-black" />
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
