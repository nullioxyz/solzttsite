<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\AnalyticsEvent;
use App\Models\AnalyticsVisitor;
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
            'visitor_id' => ['nullable', 'string', 'max:128'],
            'source' => ['nullable', 'string', 'max:50'],
            'referrer' => ['nullable', 'string', 'max:500'],
            'payload' => ['nullable', 'array'],
            'consent_preferences' => ['nullable', 'array'],
            'occurred_at' => ['nullable', 'date'],
        ]);

        $analyticsEnabledForRuntime = app()->environment('production') || filter_var(env('ANALYTICS_ENABLE_LOCAL', false), FILTER_VALIDATE_BOOL);

        if (!$analyticsEnabledForRuntime) {
            return response()->json(['status' => 'ignored'], 202);
        }

        $appHost = parse_url(config('app.url'), PHP_URL_HOST);
        $pageLocationHost = isset($validated['page_location']) ? parse_url($validated['page_location'], PHP_URL_HOST) : null;

        if (app()->environment('production') && $appHost && $pageLocationHost && !hash_equals(Str::lower($appHost), Str::lower($pageLocationHost))) {
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

        $consentPreferences = $this->normalizeConsentPreferences($validated['consent_preferences'] ?? []);
        $geo = $this->resolveGeo($request, $payload);
        $device = $this->resolveDevice($request->userAgent());
        $origin = $this->resolveTrafficSource(
            $validated['page_location'] ?? null,
            $validated['referrer'] ?? null,
        );

        $visitorId = $validated['visitor_id'] ?? $validated['session_key'] ?? null;
        $ipAddress = $request->ip();
        $isReturning = false;

        if ($visitorId) {
            $isReturning = $this->updateVisitorRecurrence(
                visitorId: $visitorId,
                sessionKey: $validated['session_key'] ?? null,
                occurredAt: $occurredAt,
                eventName: $eventName,
                ipAddress: $ipAddress,
                geo: $geo,
                device: $device,
                origin: $origin,
                consentPreferences: $consentPreferences,
            );
        }

        AnalyticsEvent::create([
            'event_name' => $eventName,
            'page_key' => $validated['page_key'] ?? null,
            'page_path' => $validated['page_path'] ?? null,
            'page_location' => $validated['page_location'] ?? null,
            'page_title' => $validated['page_title'] ?? null,
            'locale' => isset($validated['locale']) ? Str::lower($validated['locale']) : null,
            'session_key' => $validated['session_key'] ?? null,
            'visitor_id' => $visitorId,
            'ip_address' => $ipAddress,
            'source' => $validated['source'] ?? 'site',
            'ip_hash' => $this->hashIp($ipAddress),
            'country_code' => $geo['country_code'],
            'country_name' => $geo['country_name'],
            'city' => $geo['city'],
            'timezone' => $geo['timezone'],
            'browser' => $device['browser'],
            'os' => $device['os'],
            'device_type' => $device['device_type'],
            'is_returning' => $isReturning,
            'referrer' => $validated['referrer'] ?? null,
            'referrer_host' => $origin['referrer_host'],
            'traffic_source' => $origin['traffic_source'],
            'utm_source' => $origin['utm_source'],
            'utm_medium' => $origin['utm_medium'],
            'utm_campaign' => $origin['utm_campaign'],
            'utm_content' => $origin['utm_content'],
            'utm_term' => $origin['utm_term'],
            'payload' => $payload,
            'consent_preferences' => $consentPreferences,
            'occurred_at' => $occurredAt,
        ]);

        return response()->json(['status' => 'ok']);
    }

    private function normalizeConsentPreferences(array $consent): array
    {
        return [
            'necessary' => true,
            'analytics' => (bool) ($consent['analytics'] ?? false),
            'marketing' => (bool) ($consent['marketing'] ?? false),
        ];
    }

    private function resolveGeo(Request $request, ?array $payload): array
    {
        $countryCode = strtoupper((string) (
            $request->header('CF-IPCountry')
            ?? $request->header('X-Vercel-IP-Country')
            ?? $request->header('CloudFront-Viewer-Country')
            ?? ''
        ));

        if (strlen($countryCode) !== 2) {
            $countryCode = null;
        }

        $countryName = $request->header('X-Vercel-IP-Country-Name')
            ?? $request->header('CloudFront-Viewer-Country-Name')
            ?? null;

        if (!$countryName && $countryCode && class_exists('Locale')) {
            $countryName = \Locale::getDisplayRegion('-'.$countryCode, 'en') ?: null;
        }

        $city = $request->header('X-Vercel-IP-City')
            ?? $request->header('CF-IPCity')
            ?? $request->header('CloudFront-Viewer-City')
            ?? null;

        $payloadTimezone = is_array($payload) ? ($payload['timezone'] ?? null) : null;
        $timezone = $payloadTimezone ?: ($request->header('X-Timezone') ?: null);

        $city = is_string($city) ? trim($city) : null;
        $countryName = is_string($countryName) ? trim($countryName) : null;
        $timezone = is_string($timezone) ? trim($timezone) : null;

        return [
            'country_code' => $countryCode,
            'country_name' => $countryName ?: null,
            'city' => $city ?: null,
            'timezone' => $timezone ?: null,
        ];
    }

    private function resolveDevice(?string $userAgent): array
    {
        $ua = Str::lower((string) $userAgent);

        $browser = 'Unknown';
        if (Str::contains($ua, 'edg/')) {
            $browser = 'Edge';
        } elseif (Str::contains($ua, 'opr/') || Str::contains($ua, 'opera')) {
            $browser = 'Opera';
        } elseif (Str::contains($ua, 'chrome/') && !Str::contains($ua, 'edg/')) {
            $browser = 'Chrome';
        } elseif (Str::contains($ua, 'safari/') && !Str::contains($ua, 'chrome/')) {
            $browser = 'Safari';
        } elseif (Str::contains($ua, 'firefox/')) {
            $browser = 'Firefox';
        } elseif (Str::contains($ua, 'msie') || Str::contains($ua, 'trident/')) {
            $browser = 'Internet Explorer';
        }

        $os = 'Unknown';
        if (Str::contains($ua, 'windows nt')) {
            $os = 'Windows';
        } elseif (Str::contains($ua, 'iphone') || Str::contains($ua, 'ipad') || Str::contains($ua, 'ipod')) {
            $os = 'iOS';
        } elseif (Str::contains($ua, 'android')) {
            $os = 'Android';
        } elseif (Str::contains($ua, 'mac os x') || Str::contains($ua, 'macintosh')) {
            $os = 'macOS';
        } elseif (Str::contains($ua, 'linux')) {
            $os = 'Linux';
        }

        $deviceType = 'desktop';
        if (Str::contains($ua, 'ipad') || (Str::contains($ua, 'android') && !Str::contains($ua, 'mobile'))) {
            $deviceType = 'tablet';
        } elseif (Str::contains($ua, ['mobile', 'iphone', 'ipod', 'android'])) {
            $deviceType = 'mobile';
        }

        return [
            'browser' => $browser,
            'os' => $os,
            'device_type' => $deviceType,
        ];
    }

    private function resolveTrafficSource(?string $pageLocation, ?string $referrer): array
    {
        $pageQuery = [];
        if ($pageLocation) {
            parse_str((string) parse_url($pageLocation, PHP_URL_QUERY), $pageQuery);
        }

        $utmSource = $this->toNullableString($pageQuery['utm_source'] ?? null);
        $utmMedium = $this->toNullableString($pageQuery['utm_medium'] ?? null);
        $utmCampaign = $this->toNullableString($pageQuery['utm_campaign'] ?? null);
        $utmContent = $this->toNullableString($pageQuery['utm_content'] ?? null);
        $utmTerm = $this->toNullableString($pageQuery['utm_term'] ?? null);

        $referrerHost = $this->extractHost($referrer);
        $appHost = $this->extractHost(config('app.url'));

        $trafficSource = 'direct';

        if ($utmSource) {
            $trafficSource = 'utm:'.$utmSource;
        } elseif ($referrerHost) {
            if ($appHost && Str::contains($referrerHost, $appHost)) {
                $trafficSource = 'internal';
            } elseif ($this->isSearchEngine($referrerHost)) {
                $trafficSource = 'organic_search';
            } elseif ($this->isSocialSource($referrerHost)) {
                $trafficSource = 'social';
            } else {
                $trafficSource = 'referral';
            }
        }

        return [
            'referrer_host' => $referrerHost,
            'traffic_source' => $trafficSource,
            'utm_source' => $utmSource,
            'utm_medium' => $utmMedium,
            'utm_campaign' => $utmCampaign,
            'utm_content' => $utmContent,
            'utm_term' => $utmTerm,
        ];
    }

    private function isSearchEngine(string $host): bool
    {
        return Str::contains($host, [
            'google.',
            'bing.',
            'yahoo.',
            'duckduckgo.',
            'baidu.',
            'yandex.',
        ]);
    }

    private function isSocialSource(string $host): bool
    {
        return Str::contains($host, [
            'facebook.com',
            'instagram.com',
            'tiktok.com',
            'linkedin.com',
            'twitter.com',
            'x.com',
            't.co',
            'pinterest.',
            'youtube.',
            'whatsapp.',
        ]);
    }

    private function extractHost(?string $url): ?string
    {
        if (!$url) {
            return null;
        }

        $host = parse_url($url, PHP_URL_HOST);
        if (!is_string($host) || $host === '') {
            return null;
        }

        return Str::lower($host);
    }

    private function toNullableString(mixed $value): ?string
    {
        if (!is_string($value)) {
            return null;
        }

        $trimmed = trim($value);

        return $trimmed !== '' ? Str::limit($trimmed, 120, '') : null;
    }

    private function updateVisitorRecurrence(
        string $visitorId,
        ?string $sessionKey,
        Carbon $occurredAt,
        string $eventName,
        ?string $ipAddress,
        array $geo,
        array $device,
        array $origin,
        array $consentPreferences,
    ): bool {
        $visitor = AnalyticsVisitor::query()->firstOrNew(['visitor_id' => $visitorId]);

        if (!$visitor->exists) {
            $visitor->first_seen_at = $occurredAt;
            $visitor->visit_count = 0;
            $visitor->event_count = 0;
        }

        $visitor->event_count = ((int) $visitor->event_count) + 1;

        if ($eventName === 'site_page_view') {
            $lastVisitStartedAt = $visitor->last_visit_started_at;
            $isNewVisitWindow = !$lastVisitStartedAt || $lastVisitStartedAt->lt($occurredAt->copy()->subMinutes(30));

            if ($isNewVisitWindow) {
                $visitor->visit_count = ((int) $visitor->visit_count) + 1;
                $visitor->last_visit_started_at = $occurredAt;
            }
        }

        $visitor->last_seen_at = $occurredAt;
        $visitor->last_session_key = $sessionKey;
        $visitor->last_ip_address = $ipAddress;
        $visitor->last_country_code = $geo['country_code'];
        $visitor->last_country_name = $geo['country_name'];
        $visitor->last_city = $geo['city'];
        $visitor->last_timezone = $geo['timezone'];
        $visitor->last_browser = $device['browser'];
        $visitor->last_os = $device['os'];
        $visitor->last_device_type = $device['device_type'];
        $visitor->last_referrer_host = $origin['referrer_host'];
        $visitor->last_traffic_source = $origin['traffic_source'];
        $visitor->last_utm_source = $origin['utm_source'];
        $visitor->consent_preferences = $consentPreferences;
        $visitor->save();

        return ((int) $visitor->visit_count) > 1;
    }

    private function hashIp(?string $ip): ?string
    {
        if (!$ip) {
            return null;
        }

        return hash('sha256', $ip.'|'.config('app.key'));
    }
}
