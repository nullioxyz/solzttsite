<?php

namespace App\Services\Meta;

use Illuminate\Http\Client\Factory as HttpFactory;
use RuntimeException;

class MetaConversionsApiClient
{
    public function __construct(private readonly HttpFactory $http)
    {
    }

    public function send(array $event): array
    {
        $pixelId = (string) config('services.facebook.pixel_id');
        $accessToken = (string) config('services.facebook.access_token');

        if ($pixelId === '' || $accessToken === '') {
            throw new RuntimeException('Meta CAPI credentials are not configured.');
        }

        $version = trim((string) config('services.facebook.graph_api_version', 'v25.0'), '/');
        $payload = [
            'data' => [$event],
            'access_token' => $accessToken,
        ];

        $testEventCode = (string) config('services.facebook.test_event_code');
        if ($testEventCode !== '') {
            $payload['test_event_code'] = $testEventCode;
        }

        return $this->http
            ->asJson()
            ->acceptJson()
            ->timeout((int) config('services.facebook.timeout', 5))
            ->post("https://graph.facebook.com/{$version}/{$pixelId}/events", $payload)
            ->throw()
            ->json();
    }
}
