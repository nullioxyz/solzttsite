<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AnalyticsEvent;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Dashboard', [
            'metrics' => $this->buildMetrics(),
            'tracking' => [
                'ga_enabled' => app()->environment('production') && filled(config('services.google_analytics.measurement_id')),
                'meta_enabled' => app()->environment('production') && filled(config('services.facebook.pixel_id')),
            ],
        ]);
    }

    public function metrics(): JsonResponse
    {
        return response()->json($this->buildMetrics());
    }

    private function buildMetrics(): array
    {
        $onlineSince = now()->subMinutes(5);
        $since24h = now()->subDay();

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
            ->select(['event_name', 'page_path', 'locale', 'occurred_at'])
            ->latest('occurred_at')
            ->limit(10)
            ->get();

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
            'updated_at' => now()->toIso8601String(),
        ];
    }
}
