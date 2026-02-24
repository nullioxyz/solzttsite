<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\AnalyticsEvent;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AnalyticsController extends Controller
{
    public function collect(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'event_name' => ['required', 'string', 'max:80'],
            'page_key' => ['nullable', 'string', 'max:80'],
            'page_path' => ['nullable', 'string', 'max:255'],
            'page_location' => ['nullable', 'string', 'max:500'],
            'page_title' => ['nullable', 'string', 'max:255'],
            'locale' => ['nullable', 'string', 'max:10'],
            'session_key' => ['nullable', 'string', 'max:128'],
            'source' => ['nullable', 'string', 'max:50'],
            'referrer' => ['nullable', 'string', 'max:500'],
            'payload' => ['nullable', 'array'],
            'occurred_at' => ['nullable', 'date'],
        ]);

        if (!app()->environment('production')) {
            return response()->json(['status' => 'ignored'], 202);
        }

        $appHost = parse_url(config('app.url'), PHP_URL_HOST);
        $pageLocationHost = isset($validated['page_location']) ? parse_url($validated['page_location'], PHP_URL_HOST) : null;

        if ($appHost && $pageLocationHost && !hash_equals(Str::lower($appHost), Str::lower($pageLocationHost))) {
            return response()->json(['status' => 'ignored'], 202);
        }

        $eventName = Str::of($validated['event_name'])
            ->lower()
            ->replaceMatches('/[^a-z0-9_]/', '_')
            ->replaceMatches('/_+/', '_')
            ->trim('_')
            ->substr(0, 80)
            ->value();

        if (empty($eventName)) {
            return response()->json(['status' => 'invalid'], 422);
        }

        $occurredAt = isset($validated['occurred_at'])
            ? Carbon::parse($validated['occurred_at'])
            : now();

        if ($occurredAt->greaterThan(now()->addMinutes(10)) || $occurredAt->lessThan(now()->subDays(3))) {
            $occurredAt = now();
        }

        $payload = $validated['payload'] ?? null;
        if (is_array($payload)) {
            $payloadJson = json_encode($payload);
            if ($payloadJson === false || strlen($payloadJson) > 4096) {
                $payload = null;
            }
        }

        AnalyticsEvent::create([
            'event_name' => $eventName,
            'page_key' => $validated['page_key'] ?? null,
            'page_path' => $validated['page_path'] ?? null,
            'page_location' => $validated['page_location'] ?? null,
            'page_title' => $validated['page_title'] ?? null,
            'locale' => isset($validated['locale']) ? Str::lower($validated['locale']) : null,
            'session_key' => $validated['session_key'] ?? null,
            'source' => $validated['source'] ?? 'site',
            'referrer' => $validated['referrer'] ?? null,
            'payload' => $payload,
            'occurred_at' => $occurredAt,
        ]);

        return response()->json(['status' => 'ok']);
    }
}
