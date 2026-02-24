<?php

namespace App\Services;

use App\Models\AnalyticsEvent;
use App\Models\AnalyticsVisitor;
use App\Models\Contact;

class AnalyticsMetricsService
{
    public function build(): array
    {
        $onlineSince = now()->subMinutes(5);
        $since24h = now()->subDay();
        $since7d = now()->subDays(7);
        $since30d = now()->subDays(30);

        $onlineUsers = AnalyticsEvent::query()
            ->where('event_name', 'site_page_view')
            ->where('occurred_at', '>=', $onlineSince)
            ->whereNotNull('session_key')
            ->distinct('session_key')
            ->count('session_key');

        $totalPageViews24h = AnalyticsEvent::query()
            ->where('event_name', 'site_page_view')
            ->where('occurred_at', '>=', $since24h)
            ->count();

        $topPages = AnalyticsEvent::query()
            ->where('event_name', 'site_page_view')
            ->where('occurred_at', '>=', $since24h)
            ->selectRaw('page_path, MAX(page_title) as page_title, COUNT(*) as visits')
            ->groupBy('page_path')
            ->orderByDesc('visits')
            ->limit(8)
            ->get();

        $topEvents = AnalyticsEvent::query()
            ->where('occurred_at', '>=', $since24h)
            ->where('event_name', '!=', 'site_page_view')
            ->selectRaw('event_name, COUNT(*) as total')
            ->groupBy('event_name')
            ->orderByDesc('total')
            ->limit(8)
            ->get();

        $latestEvents = AnalyticsEvent::query()
            ->select([
                'event_name',
                'page_path',
                'locale',
                'country_code',
                'city',
                'browser',
                'device_type',
                'traffic_source',
                'ip_address',
                'occurred_at',
            ])
            ->latest('occurred_at')
            ->limit(10)
            ->get();

        $topCountries = AnalyticsEvent::query()
            ->where('event_name', 'site_page_view')
            ->where('occurred_at', '>=', $since7d)
            ->whereNotNull('country_code')
            ->selectRaw('country_code, MAX(country_name) as country_name, COUNT(*) as total')
            ->groupBy('country_code')
            ->orderByDesc('total')
            ->limit(8)
            ->get();

        $topCities = AnalyticsEvent::query()
            ->where('event_name', 'site_page_view')
            ->where('occurred_at', '>=', $since7d)
            ->whereNotNull('city')
            ->selectRaw('city, MAX(country_code) as country_code, COUNT(*) as total')
            ->groupBy('city')
            ->orderByDesc('total')
            ->limit(8)
            ->get();

        $topTrafficSources = AnalyticsEvent::query()
            ->where('event_name', 'site_page_view')
            ->where('occurred_at', '>=', $since7d)
            ->whereNotNull('traffic_source')
            ->selectRaw('traffic_source, COUNT(*) as total')
            ->groupBy('traffic_source')
            ->orderByDesc('total')
            ->limit(8)
            ->get();

        $deviceBreakdown = AnalyticsEvent::query()
            ->where('event_name', 'site_page_view')
            ->where('occurred_at', '>=', $since7d)
            ->whereNotNull('device_type')
            ->selectRaw('device_type as label, COUNT(*) as total')
            ->groupBy('device_type')
            ->orderByDesc('total')
            ->get();

        $browserBreakdown = AnalyticsEvent::query()
            ->where('event_name', 'site_page_view')
            ->where('occurred_at', '>=', $since7d)
            ->whereNotNull('browser')
            ->selectRaw('browser as label, COUNT(*) as total')
            ->groupBy('browser')
            ->orderByDesc('total')
            ->limit(8)
            ->get();

        $accessByHourRaw = AnalyticsEvent::query()
            ->where('event_name', 'site_page_view')
            ->where('occurred_at', '>=', $since24h)
            ->selectRaw('HOUR(occurred_at) as hour_slot, COUNT(*) as total')
            ->groupBy('hour_slot')
            ->orderBy('hour_slot')
            ->get();

        $accessByHour = collect(range(0, 23))->map(function ($hour) use ($accessByHourRaw) {
            $row = $accessByHourRaw->firstWhere('hour_slot', $hour);

            return [
                'hour' => str_pad((string) $hour, 2, '0', STR_PAD_LEFT).':00',
                'total' => (int) ($row->total ?? 0),
            ];
        })->values();

        $newVisitors7d = AnalyticsVisitor::query()
            ->where('first_seen_at', '>=', $since7d)
            ->count();

        $returningVisitors7d = AnalyticsVisitor::query()
            ->where('last_seen_at', '>=', $since7d)
            ->where('visit_count', '>', 1)
            ->count();

        $visitorsForRecurrence = AnalyticsVisitor::query()
            ->where('last_seen_at', '>=', $since30d)
            ->get(['visit_count']);

        $recurrence = [
            ['label' => '1 visit', 'total' => 0],
            ['label' => '2-3 visits', 'total' => 0],
            ['label' => '4-7 visits', 'total' => 0],
            ['label' => '8+ visits', 'total' => 0],
        ];

        foreach ($visitorsForRecurrence as $visitor) {
            $count = (int) $visitor->visit_count;

            if ($count <= 1) {
                $recurrence[0]['total']++;
            } elseif ($count <= 3) {
                $recurrence[1]['total']++;
            } elseif ($count <= 7) {
                $recurrence[2]['total']++;
            } else {
                $recurrence[3]['total']++;
            }
        }

        $consentVisitors = AnalyticsVisitor::query()
            ->where('last_seen_at', '>=', $since30d)
            ->get(['consent_preferences']);

        $consentBreakdown = [
            'analytics_allowed' => 0,
            'analytics_denied' => 0,
            'marketing_allowed' => 0,
            'marketing_denied' => 0,
        ];

        foreach ($consentVisitors as $visitor) {
            $consent = is_array($visitor->consent_preferences) ? $visitor->consent_preferences : [];

            if (($consent['analytics'] ?? false) === true) {
                $consentBreakdown['analytics_allowed']++;
            } else {
                $consentBreakdown['analytics_denied']++;
            }

            if (($consent['marketing'] ?? false) === true) {
                $consentBreakdown['marketing_allowed']++;
            } else {
                $consentBreakdown['marketing_denied']++;
            }
        }

        $contactsReceived = Contact::query()->count();
        $contactsUnread = Contact::query()->where('read', 0)->count();

        return [
            'online_users' => $onlineUsers,
            'page_views_24h' => $totalPageViews24h,
            'contacts_received' => $contactsReceived,
            'contacts_unread' => $contactsUnread,
            'top_pages' => $topPages,
            'top_events' => $topEvents,
            'latest_events' => $latestEvents,
            'top_countries' => $topCountries,
            'top_cities' => $topCities,
            'top_traffic_sources' => $topTrafficSources,
            'device_breakdown' => $deviceBreakdown,
            'browser_breakdown' => $browserBreakdown,
            'access_by_hour' => $accessByHour,
            'new_visitors_7d' => $newVisitors7d,
            'returning_visitors_7d' => $returningVisitors7d,
            'recurrence_buckets' => $recurrence,
            'consent_breakdown' => $consentBreakdown,
            'updated_at' => now()->toIso8601String(),
        ];
    }
}
