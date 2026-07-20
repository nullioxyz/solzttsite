import { useEffect, useMemo, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  NoSymbolIcon,
  PaperAirplaneIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import request from '@/Services/requests';

const statusStyles = {
  queued: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  processing: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  sent: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  retrying: 'bg-violet-50 text-violet-700 ring-violet-600/20',
  failed: 'bg-red-50 text-red-700 ring-red-600/20',
  skipped: 'bg-slate-100 text-slate-700 ring-slate-500/20',
  untracked: 'bg-orange-50 text-orange-700 ring-orange-600/20',
};

const reasonLabels = {
  capi_disabled: 'CAPI was disabled when the contact was saved',
  capi_disabled_at_processing: 'CAPI was disabled when the worker processed the job',
  marketing_consent_missing: 'Marketing consent was not granted',
};

function formatDate(value) {
  if (!value) return '-';
  return new Date(value).toLocaleString();
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex rounded-md px-2 py-1 text-xs font-medium capitalize ring-1 ring-inset ${statusStyles[status] || statusStyles.untracked}`}>
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

export default function MetaDeliveries({ auth, metaDeliveries: initialMetaDeliveries }) {
  const [metaDeliveries, setMetaDeliveries] = useState(initialMetaDeliveries);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshError, setRefreshError] = useState(null);

  const refresh = async () => {
    setIsRefreshing(true);
    setRefreshError(null);

    try {
      const response = await request.get(route('meta-deliveries.data'));
      setMetaDeliveries(response.data);
    } catch {
      setRefreshError('The audit could not be refreshed. The last successful snapshot remains visible.');
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const interval = window.setInterval(refresh, 15000);
    return () => window.clearInterval(interval);
  }, []);

  const cards = useMemo(() => [
    { label: 'Contacts', value: metaDeliveries?.counts?.contacts, icon: UserGroupIcon, color: 'text-slate-600' },
    { label: 'Queued / Processing', value: (metaDeliveries?.counts?.queued || 0) + (metaDeliveries?.counts?.processing || 0), icon: ClockIcon, color: 'text-blue-600' },
    { label: 'Sent', value: metaDeliveries?.counts?.sent, icon: CheckCircleIcon, color: 'text-emerald-600' },
    { label: 'Retrying / Failed', value: (metaDeliveries?.counts?.retrying || 0) + (metaDeliveries?.counts?.failed || 0), icon: ExclamationTriangleIcon, color: 'text-red-600' },
    { label: 'Skipped', value: metaDeliveries?.counts?.skipped, icon: NoSymbolIcon, color: 'text-slate-600' },
    { label: 'Without audit', value: metaDeliveries?.counts?.untracked, icon: PaperAirplaneIcon, color: 'text-orange-600' },
  ], [metaDeliveries?.counts]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="text-xl font-semibold text-slate-800">Meta Lead Deliveries</h2>}
    >
      <Head title="Meta Lead Deliveries" />

      <div className="mx-auto max-w-7xl space-y-6 px-3 pb-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Conversion audit</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-800">Lead submissions and Meta CAPI status</h3>
              <p className="mt-1 text-xs text-slate-500">Counters cover the last 24 hours. Last update: {formatDate(metaDeliveries?.updated_at)}</p>
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

          {!metaDeliveries?.available && (
            <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              Conversion audit columns are unavailable. Run the pending Laravel migrations.
            </p>
          )}
          {refreshError && (
            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {refreshError}
            </p>
          )}
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
            <h3 className="text-lg font-semibold text-slate-800">Contact conversion audit</h3>
            <p className="mt-1 text-xs text-slate-500">Latest 100 contacts. Records created before this audit may appear as untracked.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Reason / Error</th>
                  <th className="px-4 py-3">Attempts</th>
                  <th className="px-4 py-3">Meta accepted</th>
                  <th className="px-4 py-3">Last activity</th>
                  <th className="px-4 py-3">Event ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(metaDeliveries?.contacts || []).length === 0 && <EmptyRow columns={8}>No contact submissions found.</EmptyRow>}
                {(metaDeliveries?.contacts || []).map((contact) => {
                  const reason = reasonLabels[contact.skip_reason]
                    || contact.last_error
                    || (contact.status === 'untracked' ? 'No conversion audit is available (legacy or expired record)' : '-');

                  return (
                    <tr key={contact.id} className="align-top text-slate-700">
                      <td className="px-4 py-3">
                        <Link href={route('contact.view', contact.id)} className="font-medium text-[#405189] hover:underline">
                          {contact.name || `Contact #${contact.id}`}
                        </Link>
                        <p className="mt-1 text-xs text-slate-500">{contact.email}</p>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">{formatDate(contact.submitted_at)}</td>
                      <td className="px-4 py-3"><StatusBadge status={contact.status} /></td>
                      <td className="max-w-sm px-4 py-3 text-xs leading-5">{reason}</td>
                      <td className="px-4 py-3">{contact.attempts}</td>
                      <td className="px-4 py-3">{contact.events_received ?? '-'}</td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {formatDate(contact.sent_at || contact.last_attempt_at || contact.queued_at)}
                      </td>
                      <td className="max-w-[180px] truncate px-4 py-3 font-mono text-xs" title={contact.event_id || ''}>
                        {contact.event_id || '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {(metaDeliveries?.legacy_deliveries || []).length > 0 && (
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h3 className="text-lg font-semibold text-slate-800">Previous delivery records</h3>
              <p className="mt-1 text-xs text-slate-500">CAPI records created before contact-level auditing was enabled.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Created</th>
                    <th className="px-4 py-3">Event</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Attempts</th>
                    <th className="px-4 py-3">Meta accepted</th>
                    <th className="px-4 py-3">Sent at</th>
                    <th className="px-4 py-3">Error</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {metaDeliveries.legacy_deliveries.map((delivery) => (
                    <tr key={delivery.id} className="text-slate-700">
                      <td className="whitespace-nowrap px-4 py-3">{formatDate(delivery.created_at)}</td>
                      <td className="px-4 py-3">{delivery.event_name}</td>
                      <td className="px-4 py-3"><StatusBadge status={delivery.status} /></td>
                      <td className="px-4 py-3">{delivery.attempts}</td>
                      <td className="px-4 py-3">{delivery.events_received ?? '-'}</td>
                      <td className="whitespace-nowrap px-4 py-3">{formatDate(delivery.sent_at)}</td>
                      <td className="px-4 py-3 text-xs">{delivery.last_error || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
