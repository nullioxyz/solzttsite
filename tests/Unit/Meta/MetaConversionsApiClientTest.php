<?php

namespace Tests\Unit\Meta;

use App\Services\Meta\MetaConversionsApiClient;
use Illuminate\Support\Facades\Http;
use RuntimeException;
use Tests\TestCase;

class MetaConversionsApiClientTest extends TestCase
{
    public function test_it_sends_the_event_to_the_configured_graph_api_version(): void
    {
        config()->set('services.facebook.pixel_id', '123456789');
        config()->set('services.facebook.access_token', 'secret-test-token');
        config()->set('services.facebook.graph_api_version', 'v25.0');
        config()->set('services.facebook.test_event_code', 'TEST123');
        config()->set('services.facebook.timeout', 2);

        Http::fake([
            'graph.facebook.com/*' => Http::response(['events_received' => 1], 200),
        ]);

        $event = [
            'event_name' => 'PageView',
            'event_id' => '4701904a-cec5-4f22-9183-b7f266805531',
        ];

        $response = app(MetaConversionsApiClient::class)->send($event);

        $this->assertSame(1, $response['events_received']);
        Http::assertSent(function ($request) use ($event) {
            return $request->url() === 'https://graph.facebook.com/v25.0/123456789/events'
                && $request['data'] === [$event]
                && $request['access_token'] === 'secret-test-token'
                && $request['test_event_code'] === 'TEST123';
        });
    }

    public function test_it_fails_before_making_a_request_when_credentials_are_missing(): void
    {
        config()->set('services.facebook.pixel_id', null);
        config()->set('services.facebook.access_token', null);
        Http::fake();

        $this->expectException(RuntimeException::class);

        try {
            app(MetaConversionsApiClient::class)->send(['event_name' => 'PageView']);
        } finally {
            Http::assertNothingSent();
        }
    }
}
