<?php

namespace Tests\Feature;

use App\Jobs\SendMetaConversionJob;
use Illuminate\Support\Facades\Bus;
use Tests\TestCase;

class MetaTrackingControllerTest extends TestCase
{
    public function test_it_accepts_a_consented_browser_event_and_dispatches_capi_after_response(): void
    {
        config()->set('app.url', 'https://solztt.test');
        config()->set('services.facebook.capi_enabled', true);
        Bus::fake();

        $response = $this->withServerVariables([
            'REMOTE_ADDR' => '203.0.113.20',
            'HTTP_USER_AGENT' => 'Browser test agent',
        ])->postJson($this->endpoint(), [
            'event_name' => 'ViewContent',
            'event_id' => 'e2053506-75d0-4625-9979-6ce7790531f2',
            'event_source_url' => 'https://solztt.test/pt/portfolio/detail/example',
            'marketing_consent' => true,
            'fbp' => 'fb.1.123.456',
            'custom_data' => [
                'content_ids' => ['/pt/portfolio/detail/example'],
                'content_type' => 'product',
                'content_name' => 'Example',
                'content_category' => 'portfolio_detail',
                'not_allowed' => 'must not be forwarded',
            ],
        ]);

        $response->assertAccepted()->assertJson([
            'accepted' => true,
            'event_id' => 'e2053506-75d0-4625-9979-6ce7790531f2',
        ]);

        Bus::assertDispatchedAfterResponse(SendMetaConversionJob::class, function ($job) {
            return $job->event['event_name'] === 'ViewContent'
                && $job->event['event_id'] === 'e2053506-75d0-4625-9979-6ce7790531f2'
                && $job->event['user_data']['fbp'] === 'fb.1.123.456'
                && !array_key_exists('not_allowed', $job->event['custom_data']);
        });
    }

    public function test_it_does_not_dispatch_when_capi_is_disabled(): void
    {
        config()->set('app.url', 'https://solztt.test');
        config()->set('services.facebook.capi_enabled', false);
        Bus::fake();

        $this->postJson($this->endpoint(), [
            'event_name' => 'PageView',
            'event_id' => '4701904a-cec5-4f22-9183-b7f266805531',
            'event_source_url' => 'https://solztt.test/pt',
            'marketing_consent' => true,
        ])->assertAccepted()->assertJson(['accepted' => false, 'reason' => 'disabled']);

        Bus::assertNotDispatched(SendMetaConversionJob::class);
    }

    public function test_it_rejects_events_without_marketing_consent(): void
    {
        config()->set('app.url', 'https://solztt.test');
        config()->set('services.facebook.capi_enabled', true);
        Bus::fake();

        $this->postJson($this->endpoint(), [
            'event_name' => 'PageView',
            'event_id' => '4701904a-cec5-4f22-9183-b7f266805531',
            'event_source_url' => 'https://solztt.test/pt',
            'marketing_consent' => false,
        ])->assertUnprocessable()->assertJsonValidationErrors('marketing_consent');

        Bus::assertNotDispatched(SendMetaConversionJob::class);
    }

    public function test_it_rejects_lead_from_the_generic_browser_endpoint(): void
    {
        config()->set('app.url', 'https://solztt.test');
        config()->set('services.facebook.capi_enabled', true);
        Bus::fake();

        $this->postJson($this->endpoint(), [
            'event_name' => 'Lead',
            'event_id' => '4701904a-cec5-4f22-9183-b7f266805531',
            'event_source_url' => 'https://solztt.test/pt/contact',
            'marketing_consent' => true,
        ])->assertUnprocessable()->assertJsonValidationErrors('event_name');

        Bus::assertNotDispatched(SendMetaConversionJob::class);
    }

    public function test_it_rejects_an_event_source_from_another_host(): void
    {
        config()->set('app.url', 'https://solztt.test');
        config()->set('services.facebook.capi_enabled', true);
        Bus::fake();

        $this->postJson($this->endpoint(), [
            'event_name' => 'PageView',
            'event_id' => '4701904a-cec5-4f22-9183-b7f266805531',
            'event_source_url' => 'https://attacker.example/pt',
            'marketing_consent' => true,
        ])->assertForbidden();

        Bus::assertNotDispatched(SendMetaConversionJob::class);
    }

    public function test_it_rejects_a_cross_origin_browser_request(): void
    {
        config()->set('app.url', 'https://solztt.test');
        config()->set('services.facebook.capi_enabled', true);
        Bus::fake();

        $this->withHeader('Origin', 'https://attacker.example')
            ->postJson($this->endpoint(), [
                'event_name' => 'PageView',
                'event_id' => '4701904a-cec5-4f22-9183-b7f266805531',
                'event_source_url' => 'https://solztt.test/pt',
                'marketing_consent' => true,
            ])->assertForbidden();

        Bus::assertNotDispatched(SendMetaConversionJob::class);
    }

    private function endpoint(): string
    {
        return route('meta.events', absolute: false);
    }
}
