<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Jobs\SendMetaConversionJob;
use App\Services\Meta\MetaEventPayloadBuilder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Validation\Rule;

class MetaTrackingController extends Controller
{
    private const ALLOWED_EVENTS = [
        'PageView',
        'ViewContent',
        'ContactFormStarted',
        'ReferenceAdded',
    ];

    public function __invoke(Request $request, MetaEventPayloadBuilder $builder): JsonResponse
    {
        if (!filter_var(config('services.facebook.capi_enabled'), FILTER_VALIDATE_BOOL)) {
            return response()->json(['accepted' => false, 'reason' => 'disabled'], 202);
        }

        $validated = $request->validate([
            'event_name' => ['required', 'string', Rule::in(self::ALLOWED_EVENTS)],
            'event_id' => ['required', 'uuid'],
            'event_source_url' => ['required', 'url:http,https', 'max:2048'],
            'marketing_consent' => ['required', 'accepted'],
            'fbp' => ['nullable', 'string', 'max:255'],
            'fbc' => ['nullable', 'string', 'max:255'],
            'custom_data' => ['nullable', 'array'],
            'custom_data.content_ids' => ['nullable', 'array', 'max:20'],
            'custom_data.content_ids.*' => ['string', 'max:100'],
            'custom_data.content_type' => ['nullable', 'string', 'max:50'],
            'custom_data.content_name' => ['nullable', 'string', 'max:255'],
            'custom_data.content_category' => ['nullable', 'string', 'max:100'],
            'custom_data.page_key' => ['nullable', 'string', 'max:100'],
            'custom_data.locale' => ['nullable', 'string', 'max:10'],
            'custom_data.reference_type' => ['nullable', 'string', 'max:50'],
            'custom_data.reference_id' => ['nullable', 'string', 'max:100'],
        ]);

        abort_unless($this->hasAllowedOrigin($request, $validated['event_source_url']), 403);

        $customData = Arr::only($validated['custom_data'] ?? [], [
            'content_ids',
            'content_type',
            'content_name',
            'content_category',
            'page_key',
            'locale',
            'reference_type',
            'reference_id',
        ]);

        $event = $builder->build(
            eventName: $validated['event_name'],
            eventId: $validated['event_id'],
            eventSourceUrl: $validated['event_source_url'],
            request: $request,
            userData: [
                'fbp' => $validated['fbp'] ?? null,
                'fbc' => $validated['fbc'] ?? null,
            ],
            customData: $customData,
        );

        SendMetaConversionJob::dispatchAfterResponse($event);

        return response()->json([
            'accepted' => true,
            'event_id' => $validated['event_id'],
        ], 202);
    }

    private function hasAllowedOrigin(Request $request, string $eventSourceUrl): bool
    {
        $configuredHost = parse_url((string) config('app.url'), PHP_URL_HOST);
        $sourceHost = parse_url($eventSourceUrl, PHP_URL_HOST);
        $origin = $request->header('Origin');
        $originHost = $origin ? parse_url($origin, PHP_URL_HOST) : null;

        if (!$configuredHost || !$sourceHost || !hash_equals(strtolower($configuredHost), strtolower($sourceHost))) {
            return false;
        }

        return !$originHost || hash_equals(strtolower($configuredHost), strtolower($originHost));
    }
}
