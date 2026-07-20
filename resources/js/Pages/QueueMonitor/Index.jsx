import { useEffect, useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/outline';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import request from '@/Services/requests';

const statusStyles = {
  running: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  scheduled: 'bg-violet-50 text-violet-700 ring-violet-600/20',
};

function formatDate(value) {
  if (!value) return '-';
  return new Date(value).toLocaleString();
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex rounded-md px-2 py-1 text-xs font-medium capitalize ring-1 ring-inset ${statusStyles[status] || 'bg-slate-50 text-slate-600 ring-slate-500/20'}`}>
      {status}
    </span>
  );
}

function EmptyRow({ columns, children }) {
  return (
    <tr>
      <td colSpan={columns} className="px-4 py-10 text-center text-sm text-slate-500">
        {children}
      </td>
    </tr>
  );
}

export default function QueueMonitor({ auth, queueMonitor: initialQueueMonitor }) {
  const [queueMonitor, setQueueMonitor] = useState(initialQueueMonitor);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshError, setRefreshError] = useState(null);

  const refresh = async () => {
    setIsRefreshing(true);
    setRefreshError(null);
    try {
      const response = await request.get(route('queue-monitor.data'));
      setQueueMonitor(response.data);
    } catch {
      setRefreshError('The queue data could not be refreshed. The last successful snapshot remains visible.');
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const interval = window.setInterval(refresh, 15000);
    return () => window.clearInterval(interval);
  }, []);

  const cards = useMemo(() => [
    { label: 'Running', value: queueMonitor?.counts?.running, icon: PlayCircleIcon, color: 'text-blue-600' },
    { label: 'Pending', value: queueMonitor?.counts?.pending, icon: ClockIcon, color: 'text-amber-600' },
    { label: 'Scheduled / Retry', value: queueMonitor?.counts?.scheduled, icon: CheckCircleIcon, color: 'text-violet-600' },
    { label: 'Failed', value: queueMonitor?.counts?.failed, icon: ExclamationTriangleIcon, color: 'text-red-600' },
  ], [queueMonitor?.counts]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="text-xl font-semibold text-slate-800">Queue Jobs</h2>}
    >
      <Head title="Queue Jobs" />

      <div className="mx-auto max-w-7xl space-y-6 px-3 pb-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Queue connection</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-800">{queueMonitor?.connection || 'unknown'}</h3>
              <p className="mt-1 text-xs text-slate-500">Last update: {formatDate(queueMonitor?.updated_at)}</p>
            </div>
            <button
              type="button"
              onClick={refresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
            >
              <ArrowPathIcon className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {!queueMonitor?.available && (
            <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              The jobs or failed_jobs table is unavailable. Run the Laravel migrations before using this module.
            </p>
          )}
          {queueMonitor?.connection === 'sync' && (
            <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              QUEUE_CONNECTION is sync. Jobs run inside the request and will not appear as pending or running here.
            </p>
          )}
          {refreshError && (
            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {refreshError}
            </p>
          )}
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{card.label}</p>
                  <Icon className={`h-6 w-6 ${card.color}`} />
                </div>
                <p className="mt-3 text-3xl font-bold text-slate-900">{card.value || 0}</p>
              </div>
            );
          })}
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h3 className="text-lg font-semibold text-slate-800">Active queue</h3>
            <p className="mt-1 text-xs text-slate-500">Running, pending and scheduled jobs. Limited to the latest 50 records.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Job</th>
                  <th className="px-4 py-3">Queue</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Attempts</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Reserved / Available</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(queueMonitor?.jobs || []).length === 0 && <EmptyRow columns={6}>No queued jobs.</EmptyRow>}
                {(queueMonitor?.jobs || []).map((job) => (
                  <tr key={job.id} className="text-slate-700">
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900">{job.name}</td>
                    <td className="px-4 py-3">{job.queue}</td>
                    <td className="px-4 py-3"><StatusBadge status={job.status} /></td>
                    <td className="px-4 py-3">{job.attempts}</td>
                    <td className="whitespace-nowrap px-4 py-3">{formatDate(job.created_at)}</td>
                    <td className="whitespace-nowrap px-4 py-3">{formatDate(job.reserved_at || job.available_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h3 className="text-lg font-semibold text-slate-800">Failed jobs</h3>
            <p className="mt-1 text-xs text-slate-500">Payloads and full stack traces are intentionally hidden. Limited to the latest 50 records.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Job</th>
                  <th className="px-4 py-3">Queue</th>
                  <th className="px-4 py-3">Connection</th>
                  <th className="px-4 py-3">Error</th>
                  <th className="px-4 py-3">Failed at</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(queueMonitor?.failed_jobs || []).length === 0 && <EmptyRow columns={5}>No failed jobs.</EmptyRow>}
                {(queueMonitor?.failed_jobs || []).map((job) => (
                  <tr key={job.uuid} className="align-top text-slate-700">
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900">{job.name}</td>
                    <td className="px-4 py-3">{job.queue}</td>
                    <td className="px-4 py-3">{job.connection}</td>
                    <td className="max-w-xl px-4 py-3 text-xs leading-5 text-red-700">{job.error}</td>
                    <td className="whitespace-nowrap px-4 py-3">{formatDate(job.failed_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AuthenticatedLayout>
  );
}
