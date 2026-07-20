<?php

namespace Tests\Unit\Meta;

use App\Jobs\SendMetaConversionJob;
use App\Models\MetaConversionDelivery;
use App\Services\Meta\MetaConversionsApiClient;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use RuntimeException;
use Tests\TestCase;

class SendMetaConversionJobTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        config()->set('database.default', 'sqlite');
        config()->set('database.connections.sqlite.database', ':memory:');
        config()->set('services.facebook.capi_enabled', true);
        DB::purge('sqlite');

        Schema::create('meta_conversion_deliveries', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('contact_id')->nullable();
            $table->uuid('event_id')->unique();
            $table->string('event_name');
            $table->string('status')->default('processing');
            $table->string('skip_reason')->nullable();
            $table->unsignedSmallInteger('attempts')->default(0);
            $table->unsignedSmallInteger('events_received')->nullable();
            $table->string('trace_id')->nullable();
            $table->string('last_error')->nullable();
            $table->timestamp('queued_at')->nullable();
            $table->timestamp('last_attempt_at')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->timestamps();
        });
    }

    public function test_it_records_a_successful_delivery_without_storing_the_event_payload(): void
    {
        $client = $this->mock(MetaConversionsApiClient::class);
        $client->shouldReceive('send')->once()->andReturn([
            'events_received' => 1,
            'fbtrace_id' => 'trace-123',
        ]);

        $event = $this->event();
        (new SendMetaConversionJob($event))->handle($client);

        $delivery = MetaConversionDelivery::query()->firstOrFail();
        $this->assertSame('sent', $delivery->status);
        $this->assertSame(1, $delivery->attempts);
        $this->assertSame(1, $delivery->events_received);
        $this->assertSame('trace-123', $delivery->trace_id);
        $this->assertArrayNotHasKey('user_data', $delivery->getAttributes());
    }

    public function test_it_records_retry_and_final_failure_without_exception_messages(): void
    {
        $client = $this->mock(MetaConversionsApiClient::class);
        $exception = new RuntimeException('secret data that must not be persisted');
        $client->shouldReceive('send')->once()->andThrow($exception);
        $job = new SendMetaConversionJob($this->event());

        try {
            $job->handle($client);
            $this->fail('The job should rethrow delivery failures for the queue retry mechanism.');
        } catch (RuntimeException $caught) {
            $this->assertSame($exception, $caught);
        }

        $delivery = MetaConversionDelivery::query()->firstOrFail();
        $this->assertSame('retrying', $delivery->status);
        $this->assertSame(RuntimeException::class, $delivery->last_error);
        $this->assertStringNotContainsString('secret data', $delivery->last_error);

        $job->failed($exception);
        $this->assertSame('failed', $delivery->fresh()->status);
    }

    public function test_it_does_not_resend_an_event_that_was_already_accepted(): void
    {
        MetaConversionDelivery::query()->create([
            'event_id' => $this->event()['event_id'],
            'event_name' => 'Lead',
            'status' => 'sent',
            'attempts' => 1,
            'events_received' => 1,
            'sent_at' => now(),
        ]);

        $client = $this->mock(MetaConversionsApiClient::class);
        $client->shouldNotReceive('send');

        (new SendMetaConversionJob($this->event()))->handle($client);

        $delivery = MetaConversionDelivery::query()->firstOrFail();
        $this->assertSame(1, $delivery->attempts);
        $this->assertSame('sent', $delivery->status);
    }

    public function test_it_marks_a_queued_event_as_skipped_if_capi_is_disabled_before_processing(): void
    {
        config()->set('services.facebook.capi_enabled', false);

        $client = $this->mock(MetaConversionsApiClient::class);
        $client->shouldNotReceive('send');

        (new SendMetaConversionJob($this->event()))->handle($client);

        $this->assertDatabaseHas('meta_conversion_deliveries', [
            'event_id' => $this->event()['event_id'],
            'status' => 'skipped',
            'skip_reason' => 'capi_disabled_at_processing',
            'attempts' => 0,
        ]);
    }

    private function event(): array
    {
        return [
            'event_name' => 'Lead',
            'event_id' => '68f1597d-476a-4b66-ae82-90c8f31bb585',
            'user_data' => [
                'em' => hash('sha256', 'lead@example.com'),
            ],
        ];
    }
}
