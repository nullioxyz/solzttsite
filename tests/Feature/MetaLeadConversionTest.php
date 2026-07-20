<?php

namespace Tests\Feature;

use App\Jobs\SendMetaConversionJob;
use App\Services\ContactService;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\URL;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class MetaLeadConversionTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        config()->set('database.default', 'sqlite');
        config()->set('database.connections.sqlite.database', ':memory:');
        DB::purge('sqlite');

        Schema::create('language', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('default')->default(false);
            $table->string('slug');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('social', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('url')->nullable();
        });

        Schema::create('site_setting', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->nullable();
            $table->unsignedBigInteger('theme_id')->nullable();
        });

        Schema::create('institucional', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('language_id')->nullable();
            $table->unsignedBigInteger('content_type_id')->nullable();
            $table->string('title')->nullable();
            $table->string('subtitle')->nullable();
            $table->text('description')->nullable();
            $table->string('slug')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        DB::table('language')->insert([
            'name' => 'Português',
            'slug' => 'pt',
            'default' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        config()->set('services.hcaptcha.secret', 'hcaptcha-test-secret');
        config()->set('services.facebook.capi_enabled', true);
    }

    public function test_lead_is_dispatched_only_after_a_contact_is_successfully_persisted(): void
    {
        Bus::fake();
        Http::fake([
            'hcaptcha.com/siteverify' => Http::response(['success' => true]),
        ]);

        $this->mock(ContactService::class, function ($mock) {
            $mock->shouldReceive('storeContact')
                ->once()
                ->withArgs(fn (array $data) => !array_key_exists('meta_tracking', $data))
                ->andReturn((object) [
                    'id' => 73,
                    'email' => 'lead@example.com',
                    'phone' => '+393331234567',
                    'firstname' => 'Lead',
                    'lastname' => 'Example',
                    'city' => 'La Spezia',
                    'contact_me_by' => 'WhatsApp',
                ]);
        });

        $eventId = '16e3ed18-38ce-46b0-b09d-58380bad85e8';

        $response = $this->post('/pt/save-contact', $this->validContactPayload([
            'meta_tracking' => [
                'event_id' => $eventId,
                'event_source_url' => 'https://solztt.test/pt/contact',
                'marketing_consent' => true,
                'fbp' => 'fb.1.123.456',
                'fbc' => 'fb.1.123.click',
            ],
        ]));

        $successUrl = $response->headers->get('Location');
        $this->assertNotNull($successUrl);
        $this->assertStringContainsString('/pt/contact/success/', $successUrl);

        $this->get($successUrl)
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Site/Contact/Success')
                ->where('success.celebrate', true)
                ->where('success.event_id', $eventId)
                ->where('success.tracking.references_count', 0)
                ->where('success.tracking.uploaded_files_count', 0)
                ->where('success.tracking.preferred_contact', 'WhatsApp'));

        $this->get($successUrl)
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Site/Contact/Success')
                ->where('success.celebrate', false)
                ->where('success.event_id', null)
                ->where('success.tracking', []));

        Bus::assertDispatchedAfterResponse(SendMetaConversionJob::class, function ($job) use ($eventId) {
            return $job->event['event_name'] === 'Lead'
                && $job->event['event_id'] === $eventId
                && $job->event['user_data']['fbp'] === 'fb.1.123.456'
                && $job->event['custom_data']['content_category'] === 'tattoo_booking';
        });
    }

    public function test_success_page_rejects_direct_or_sessionless_access(): void
    {
        $token = 'fb457769-23a8-4aa7-b28c-ebf0c2b4f983';

        $this->get(route('site.contact.success', [
            'locale' => 'pt',
            'token' => $token,
        ]))->assertForbidden();

        $signedUrl = URL::temporarySignedRoute(
            'site.contact.success',
            now()->addMinutes(30),
            ['locale' => 'pt', 'token' => $token],
        );

        $this->get($signedUrl)
            ->assertRedirect(route('site.contact', ['locale' => 'pt']));
    }

    public function test_success_page_rejects_an_expired_signature(): void
    {
        $expiredUrl = URL::temporarySignedRoute(
            'site.contact.success',
            now()->subMinute(),
            [
                'locale' => 'pt',
                'token' => '5521fb0a-f26b-44d9-b6cb-7646a262ae19',
            ],
        );

        $this->get($expiredUrl)->assertForbidden();
    }

    public function test_lead_is_not_dispatched_when_hcaptcha_rejects_the_submission(): void
    {
        Bus::fake();
        Http::fake([
            'hcaptcha.com/siteverify' => Http::response(['success' => false]),
        ]);
        $this->mock(ContactService::class, fn ($mock) => $mock->shouldNotReceive('storeContact'));

        $this->from('/pt/contact')
            ->post('/pt/save-contact', $this->validContactPayload())
            ->assertRedirect('/pt/contact');

        Bus::assertNotDispatched(SendMetaConversionJob::class);
    }

    private function validContactPayload(array $overrides = []): array
    {
        return array_replace_recursive([
            'token' => 'valid-hcaptcha-token',
            'tattoo_idea' => str_repeat('Detailed tattoo idea ', 2),
            'size' => 'medium',
            'body_location' => 'arm',
            'email' => 'lead@example.com',
            'phone' => '+393331234567',
            'firstname' => 'Lead',
            'lastname' => 'Example',
            'city' => 'La Spezia',
            'contact_me_by' => 'WhatsApp',
            'availability' => 'Weekdays',
            'attachments' => [],
            'meta_tracking' => [
                'event_id' => '16e3ed18-38ce-46b0-b09d-58380bad85e8',
                'event_source_url' => 'https://solztt.test/pt/contact',
                'marketing_consent' => true,
            ],
        ], $overrides);
    }
}
