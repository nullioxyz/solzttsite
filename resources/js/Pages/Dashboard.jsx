import { useEffect, useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import {
  ArrowPathIcon,
  BoltIcon,
  EnvelopeIcon,
  EnvelopeOpenIcon,
  ChartBarIcon,
  EyeIcon,
  GlobeAltIcon,
  SignalIcon,
} from '@heroicons/react/24/outline';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import request from '@/Services/requests';

function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(value || 0);
}

export default function Dashboard({ auth, metrics: initialMetrics, tracking }) {
  const [metrics, setMetrics] = useState(initialMetrics);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshMetrics = async () => {
    setIsRefreshing(true);
    try {
      const response = await request.get(route('dashboard.metrics'));
      setMetrics(response.data);
    } catch (error) {
      console.error('Failed to refresh dashboard metrics', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refreshMetrics();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const topPageMax = useMemo(() => {
    const max = Math.max(...(metrics?.top_pages?.map((item) => Number(item.visits)) || [0]));
    return max || 1;
  }, [metrics?.top_pages]);

  const topEventMax = useMemo(() => {
    const max = Math.max(...(metrics?.top_events?.map((item) => Number(item.total)) || [0]));
    return max || 1;
  }, [metrics?.top_events]);

  const updatedAt = useMemo(() => {
    if (!metrics?.updated_at) return '-';
    return new Date(metrics.updated_at).toLocaleString('en-US');
  }, [metrics?.updated_at]);

  const statCards = [
    {
      title: 'Online Users (5m)',
      value: formatNumber(metrics?.online_users),
      icon: SignalIcon,
      accent: 'from-slate-900 to-slate-700',
    },
    {
      title: 'Page Views (24h)',
      value: formatNumber(metrics?.page_views_24h),
      icon: EyeIcon,
      accent: 'from-slate-800 to-slate-600',
    },
    {
      title: 'Contacts Received',
      value: formatNumber(metrics?.contacts_received),
      icon: EnvelopeIcon,
      accent: 'from-slate-700 to-slate-500',
    },
    {
      title: 'Contacts Unread',
      value: formatNumber(metrics?.contacts_unread),
      icon: EnvelopeOpenIcon,
      accent: 'from-slate-700 to-slate-600',
    },
  ];

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="text-xl font-semibold text-slate-800">Analytics Dashboard</h2>}
    >
      <Head title="Dashboard" />

      <div className="mx-auto max-w-7xl space-y-6 px-3 pb-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Overview</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-800">Traffic and Contact Monitoring</h3>
            </div>
            <button
              type="button"
              onClick={refreshMetrics}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              <ArrowPathIcon className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-500">Last update: {updatedAt}</p>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => {
            const Icon = card.icon;

            return (
              <div key={card.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className={`bg-gradient-to-r ${card.accent} px-5 py-4`}>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-200">{card.title}</p>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="px-5 py-4">
                  <p className="text-3xl font-bold text-slate-900">{card.value}</p>
                </div>
              </div>
            );
          })}
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">Tracking Integrations</h3>
              <BoltIcon className="h-5 w-5 text-slate-400" />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Google Analytics</p>
                  <ChartBarIcon className="h-4 w-4 text-slate-500" />
                </div>
                <p className={`mt-2 text-base font-semibold ${tracking?.ga_enabled ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {tracking?.ga_enabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Meta Pixel</p>
                  <BoltIcon className="h-4 w-4 text-slate-500" />
                </div>
                <p className={`mt-2 text-base font-semibold ${tracking?.meta_enabled ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {tracking?.meta_enabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">Top Pages (24h)</h3>
              <GlobeAltIcon className="h-5 w-5 text-slate-400" />
            </div>

            <div className="space-y-3">
              {(metrics?.top_pages || []).length === 0 && (
                <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-500">No tracked page views yet.</p>
              )}

              {(metrics?.top_pages || []).map((item) => {
                const visits = Number(item.visits || 0);
                const width = `${Math.max((visits / topPageMax) * 100, 4)}%`;

                return (
                  <div key={`${item.page_path}-${visits}`}>
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-slate-700">{item.page_path || '-'}</p>
                      <span className="text-xs font-semibold text-slate-500">{formatNumber(visits)}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100/90">
                      <div className="h-full rounded-full bg-gradient-to-r from-slate-900 to-slate-700" style={{ width }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">Top Events (24h)</h3>
              <ChartBarIcon className="h-5 w-5 text-slate-400" />
            </div>

            <div className="space-y-3">
              {(metrics?.top_events || []).length === 0 && (
                <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-500">No tracked events yet.</p>
              )}

              {(metrics?.top_events || []).map((item) => {
                const total = Number(item.total || 0);
                const width = `${Math.max((total / topEventMax) * 100, 4)}%`;

                return (
                  <div key={`${item.event_name}-${total}`}>
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-slate-700">{item.event_name}</p>
                      <span className="text-xs font-semibold text-slate-500">{formatNumber(total)}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100/90">
                      <div className="h-full rounded-full bg-gradient-to-r from-slate-700 to-slate-500" style={{ width }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">Contact Inbox Summary</h3>
              <EnvelopeIcon className="h-5 w-5 text-slate-400" />
            </div>
            <div className="space-y-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total Received</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{formatNumber(metrics?.contacts_received)}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Unread</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{formatNumber(metrics?.contacts_unread)}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-slate-800">Latest Events</h3>
            <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">Live stream</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="py-2 pr-4">Event</th>
                  <th className="py-2 pr-4">Path</th>
                  <th className="py-2 pr-4">Locale</th>
                  <th className="py-2 pr-4">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(metrics?.latest_events || []).map((item, index) => (
                  <tr key={`${item.event_name}-${item.occurred_at}-${index}`}>
                    <td className="py-2 pr-4 font-medium text-slate-700">{item.event_name}</td>
                    <td className="py-2 pr-4 text-slate-600">{item.page_path || '-'}</td>
                    <td className="py-2 pr-4 text-slate-600">{item.locale || '-'}</td>
                    <td className="py-2 pr-4 text-slate-600">{new Date(item.occurred_at).toLocaleString('en-US')}</td>
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
