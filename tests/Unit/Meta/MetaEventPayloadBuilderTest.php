<?php

namespace Tests\Unit\Meta;

use App\Services\Meta\MetaEventPayloadBuilder;
use Illuminate\Http\Request;
use Tests\TestCase;

class MetaEventPayloadBuilderTest extends TestCase
{
    public function test_it_builds_a_lead_with_hashed_customer_data_and_matching_event_id(): void
    {
        $request = Request::create(
            'https://solztt.test/pt/save-contact',
            'POST',
            server: [
                'REMOTE_ADDR' => '203.0.113.10',
                'HTTP_USER_AGENT' => 'Meta CAPI test agent',
            ],
        );

        $contact = (object) [
            'id' => 42,
            'email' => ' Test@Example.COM ',
            'phone' => '+39 (333) 123-4567',
            'firstname' => 'Rafáel',
            'lastname' => 'Franke',
            'city' => 'La Spezia',
            'contact_me_by' => 'WhatsApp',
        ];

        $event = app(MetaEventPayloadBuilder::class)->buildLead($contact, [
            'event_id' => 'd16b6651-8a03-4ca9-bc85-fc3e7bb0c8e7',
            'event_source_url' => 'https://solztt.test/pt/contact',
            'fbp' => 'fb.1.123.456',
            'fbc' => 'fb.1.123.click',
            'references_count' => 2,
            'uploaded_files_count' => 1,
        ], $request);

        $this->assertSame('Lead', $event['event_name']);
        $this->assertSame('d16b6651-8a03-4ca9-bc85-fc3e7bb0c8e7', $event['event_id']);
        $this->assertSame('website', $event['action_source']);
        $this->assertSame('https://solztt.test/pt/contact', $event['event_source_url']);
        $this->assertSame(hash('sha256', 'test@example.com'), $event['user_data']['em']);
        $this->assertSame(hash('sha256', '393331234567'), $event['user_data']['ph']);
        $this->assertSame(hash('sha256', 'rafael'), $event['user_data']['fn']);
        $this->assertSame(hash('sha256', 'laspezia'), $event['user_data']['ct']);
        $this->assertSame(hash('sha256', 'contact42'), $event['user_data']['external_id']);
        $this->assertSame('fb.1.123.456', $event['user_data']['fbp']);
        $this->assertSame('203.0.113.10', $event['user_data']['client_ip_address']);
        $this->assertSame(2, $event['custom_data']['references_count']);
    }

    public function test_it_does_not_include_empty_or_unknown_user_fields(): void
    {
        $request = Request::create('https://solztt.test/meta/events', 'POST');

        $event = app(MetaEventPayloadBuilder::class)->build(
            eventName: 'PageView',
            eventId: '4701904a-cec5-4f22-9183-b7f266805531',
            eventSourceUrl: 'https://solztt.test/pt',
            request: $request,
            userData: ['em' => null, 'untrusted' => 'must-not-be-sent'],
        );

        $this->assertArrayNotHasKey('em', $event['user_data']);
        $this->assertArrayNotHasKey('untrusted', $event['user_data']);
    }
}
