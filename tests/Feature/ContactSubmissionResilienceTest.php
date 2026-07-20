<?php

namespace Tests\Feature;

use App\Services\ContactService;
use App\Strategies\Files\MediaUploadStrategy;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Schema;
use RuntimeException;
use Tests\TestCase;

class ContactSubmissionResilienceTest extends TestCase
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

        DB::table('language')->insert([
            'name' => 'Português',
            'slug' => 'pt',
            'default' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        config()->set('services.hcaptcha.secret', 'hcaptcha-test-secret');
        config()->set('services.facebook.capi_enabled', false);
    }

    public function test_hcaptcha_connection_failure_returns_a_validation_error(): void
    {
        Http::fake(fn () => throw new ConnectionException('hCaptcha unavailable'));
        $this->mock(ContactService::class, fn ($mock) => $mock->shouldNotReceive('storeContact'));

        $this->from('/pt/contact')
            ->post('/pt/save-contact', $this->validContactPayload())
            ->assertRedirect('/pt/contact')
            ->assertSessionHasErrors('error');
    }

    public function test_attachment_queue_failure_does_not_lose_the_persisted_contact(): void
    {
        Http::fake([
            'hcaptcha.com/siteverify' => Http::response(['success' => true]),
        ]);

        $contact = (object) ['id' => 74];
        $this->mock(ContactService::class, fn ($mock) => $mock
            ->shouldReceive('storeContact')
            ->once()
            ->andReturn($contact));
        $this->mock(MediaUploadStrategy::class, fn ($mock) => $mock
            ->shouldReceive('uploadAsync')
            ->once()
            ->andThrow(new RuntimeException('storage unavailable')));

        $response = $this->post('/pt/save-contact', $this->validContactPayload([
            'files' => [UploadedFile::fake()->image('reference.jpg')],
        ]));

        $response->assertRedirect();
        $this->assertStringContainsString(
            '/pt/contact/success/',
            (string) $response->headers->get('Location'),
        );
        $response->assertSessionHasNoErrors();
    }

    public function test_contact_rate_limit_returns_a_form_error_and_does_not_mix_different_leads(): void
    {
        Http::fake([
            'hcaptcha.com/siteverify' => Http::response(['success' => true]),
        ]);

        $this->mock(ContactService::class, fn ($mock) => $mock
            ->shouldReceive('storeContact')
            ->times(4)
            ->andReturn((object) ['id' => 74]));

        for ($attempt = 0; $attempt < 3; $attempt++) {
            $response = $this->from('/pt/contact')
                ->post('/pt/save-contact', $this->validContactPayload());

            $response->assertRedirect();
            $this->assertStringContainsString(
                '/pt/contact/success/',
                (string) $response->headers->get('Location'),
            );
        }

        $this->from('/pt/contact')
            ->post('/pt/save-contact', $this->validContactPayload())
            ->assertRedirect('/pt/contact')
            ->assertSessionHasErrors('error');

        $otherLead = $this->from('/pt/contact')->post(
            '/pt/save-contact',
            $this->validContactPayload(['email' => 'another-lead@example.com']),
        );

        $otherLead->assertRedirect();
        $this->assertStringContainsString(
            '/pt/contact/success/',
            (string) $otherLead->headers->get('Location'),
        );
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
        ], $overrides);
    }
}
