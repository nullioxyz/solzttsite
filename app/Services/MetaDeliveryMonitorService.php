<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MetaDeliveryMonitorService
{
    private const STATUSES = ['queued', 'processing', 'sent', 'retrying', 'failed', 'skipped'];

    public function snapshot(int $limit = 100): array
    {
        $hasContacts = Schema::hasTable('contact');
        $hasDeliveries = Schema::hasTable('meta_conversion_deliveries');
        $hasAuditColumns = $hasDeliveries && Schema::hasColumns('meta_conversion_deliveries', [
            'contact_id',
            'skip_reason',
            'queued_at',
        ]);

        if (! $hasContacts || ! $hasAuditColumns) {
            return $this->unavailableSnapshot();
        }

        $since = now()->subDay();
        $counts = array_fill_keys(self::STATUSES, 0);

        DB::table('meta_conversion_deliveries')
            ->where('created_at', '>=', $since)
            ->selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status')
            ->each(function ($total, $status) use (&$counts) {
                if (array_key_exists($status, $counts)) {
                    $counts[$status] = (int) $total;
                }
            });

        $counts['contacts'] = DB::table('contact')
            ->whereNull('deleted_at')
            ->where('created_at', '>=', $since)
            ->count();
        $counts['untracked'] = DB::table('contact as contacts')
            ->leftJoin('meta_conversion_deliveries as deliveries', 'deliveries.contact_id', '=', 'contacts.id')
            ->whereNull('contacts.deleted_at')
            ->where('contacts.created_at', '>=', $since)
            ->whereNull('deliveries.id')
            ->count();

        $contacts = DB::table('contact as contacts')
            ->leftJoin('meta_conversion_deliveries as deliveries', 'deliveries.contact_id', '=', 'contacts.id')
            ->whereNull('contacts.deleted_at')
            ->orderByDesc('contacts.created_at')
            ->limit($limit)
            ->get([
                'contacts.id',
                'contacts.firstname',
                'contacts.lastname',
                'contacts.email',
                'contacts.created_at',
                'deliveries.event_id',
                'deliveries.status',
                'deliveries.skip_reason',
                'deliveries.attempts',
                'deliveries.events_received',
                'deliveries.last_error',
                'deliveries.queued_at',
                'deliveries.last_attempt_at',
                'deliveries.sent_at',
            ])
            ->map(fn ($contact) => [
                'id' => $contact->id,
                'name' => trim(($contact->firstname ?? '').' '.($contact->lastname ?? '')),
                'email' => $contact->email,
                'submitted_at' => $this->timestamp($contact->created_at),
                'event_id' => $contact->event_id,
                'status' => $contact->status ?? 'untracked',
                'skip_reason' => $contact->skip_reason,
                'attempts' => (int) ($contact->attempts ?? 0),
                'events_received' => isset($contact->events_received)
                    ? (int) $contact->events_received
                    : null,
                'last_error' => $contact->last_error,
                'queued_at' => $this->timestamp($contact->queued_at),
                'last_attempt_at' => $this->timestamp($contact->last_attempt_at),
                'sent_at' => $this->timestamp($contact->sent_at),
            ])
            ->all();

        $legacyDeliveries = DB::table('meta_conversion_deliveries')
            ->whereNull('contact_id')
            ->orderByDesc('created_at')
            ->limit(30)
            ->get()
            ->map(fn ($delivery) => [
                'id' => $delivery->id,
                'event_id' => $delivery->event_id,
                'event_name' => $delivery->event_name,
                'status' => $delivery->status,
                'attempts' => (int) $delivery->attempts,
                'events_received' => isset($delivery->events_received)
                    ? (int) $delivery->events_received
                    : null,
                'last_error' => $delivery->last_error,
                'created_at' => $this->timestamp($delivery->created_at),
                'sent_at' => $this->timestamp($delivery->sent_at),
            ])
            ->all();

        return [
            'available' => true,
            'counts' => $counts,
            'contacts' => $contacts,
            'legacy_deliveries' => $legacyDeliveries,
            'updated_at' => now()->toIso8601String(),
        ];
    }

    private function unavailableSnapshot(): array
    {
        return [
            'available' => false,
            'counts' => array_merge(array_fill_keys(self::STATUSES, 0), [
                'contacts' => 0,
                'untracked' => 0,
            ]),
            'contacts' => [],
            'legacy_deliveries' => [],
            'updated_at' => now()->toIso8601String(),
        ];
    }

    private function timestamp(mixed $value): ?string
    {
        return $value ? Carbon::parse($value)->toIso8601String() : null;
    }
}
