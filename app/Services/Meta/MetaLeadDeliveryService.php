<?php

namespace App\Services\Meta;

use App\Jobs\SendMetaConversionJob;
use App\Models\MetaConversionDelivery;
use Illuminate\Http\Request;

class MetaLeadDeliveryService
{
    public function __construct(private readonly MetaEventPayloadBuilder $payloadBuilder) {}

    public function recordAndDispatch(
        object $contact,
        array $tracking,
        Request $request,
    ): MetaConversionDelivery {
        $capiEnabled = filter_var(
            config('services.facebook.capi_enabled'),
            FILTER_VALIDATE_BOOL,
        );
        $hasMarketingConsent = filter_var(
            $tracking['marketing_consent'] ?? false,
            FILTER_VALIDATE_BOOL,
        );
        $skipReason = match (true) {
            ! $capiEnabled => 'capi_disabled',
            ! $hasMarketingConsent => 'marketing_consent_missing',
            default => null,
        };

        $delivery = MetaConversionDelivery::query()->updateOrCreate(
            ['event_id' => $tracking['event_id']],
            [
                'contact_id' => $contact->id ?? null,
                'event_name' => 'Lead',
                'status' => $skipReason ? 'skipped' : 'queued',
                'skip_reason' => $skipReason,
                'queued_at' => $skipReason ? null : now(),
                'last_error' => null,
            ],
        );

        if ($skipReason) {
            return $delivery;
        }

        $event = $this->payloadBuilder->buildLead($contact, $tracking, $request);
        SendMetaConversionJob::dispatchAfterResponse($event);

        return $delivery;
    }
}
