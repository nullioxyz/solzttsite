<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class MetaDeliveryMonitorTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        Carbon::setTestNow('2026-07-20 17:00:00');

        Schema::create('contact', function (Blueprint $table) {
            $table->id();
            $table->string('firstname');
            $table->string('lastname')->nullable();
            $table->string('email');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('meta_conversion_deliveries', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('contact_id')->nullable()->unique();
            $table->uuid('event_id')->unique();
            $table->string('event_name');
            $table->string('status');
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

    protected function tearDown(): void
    {
        Carbon::setTestNow();

        parent::tearDown();
    }

    public function test_meta_delivery_monitor_requires_authentication(): void
    {
        $this->get(route('meta-deliveries.index'))->assertRedirect(route('login'));
        $this->getJson(route('meta-deliveries.data'))->assertUnauthorized();
    }

    public function test_admin_can_compare_contacts_with_conversion_delivery_statuses(): void
    {
        DB::table('contact')->insert([
            [
                'id' => 10,
                'firstname' => 'Sent',
                'lastname' => 'Lead',
                'email' => 'sent@example.com',
                'created_at' => now()->subHour(),
                'updated_at' => now()->subHour(),
            ],
            [
                'id' => 11,
                'firstname' => 'Skipped',
                'lastname' => 'Lead',
                'email' => 'skipped@example.com',
                'created_at' => now()->subMinutes(30),
                'updated_at' => now()->subMinutes(30),
            ],
            [
                'id' => 12,
                'firstname' => 'Legacy',
                'lastname' => 'Contact',
                'email' => 'legacy@example.com',
                'created_at' => now()->subMinutes(10),
                'updated_at' => now()->subMinutes(10),
            ],
        ]);

        DB::table('meta_conversion_deliveries')->insert([
            [
                'contact_id' => 10,
                'event_id' => '8f6d1afb-bdbc-4578-b74d-01e487e92c5d',
                'event_name' => 'Lead',
                'status' => 'sent',
                'skip_reason' => null,
                'attempts' => 1,
                'events_received' => 1,
                'trace_id' => 'trace-sent',
                'last_error' => null,
                'queued_at' => now()->subHour(),
                'last_attempt_at' => now()->subMinutes(59),
                'sent_at' => now()->subMinutes(59),
                'created_at' => now()->subHour(),
                'updated_at' => now()->subMinutes(59),
            ],
            [
                'contact_id' => 11,
                'event_id' => 'eb2cebf5-acf7-48ee-b495-56adbc912aed',
                'event_name' => 'Lead',
                'status' => 'skipped',
                'skip_reason' => 'marketing_consent_missing',
                'attempts' => 0,
                'events_received' => null,
                'trace_id' => null,
                'last_error' => null,
                'queued_at' => null,
                'last_attempt_at' => null,
                'sent_at' => null,
                'created_at' => now()->subMinutes(30),
                'updated_at' => now()->subMinutes(30),
            ],
            [
                'contact_id' => null,
                'event_id' => 'ab7ac0f0-2df1-4af5-aeb0-8620f1e679f3',
                'event_name' => 'Lead',
                'status' => 'failed',
                'skip_reason' => null,
                'attempts' => 4,
                'events_received' => null,
                'trace_id' => null,
                'last_error' => 'Illuminate\\Http\\Client\\RequestException:http_400',
                'queued_at' => now()->subHours(2),
                'last_attempt_at' => now()->subHour(),
                'sent_at' => null,
                'created_at' => now()->subHours(2),
                'updated_at' => now()->subHour(),
            ],
        ]);

        $user = User::factory()->make(['id' => 1]);

        $this->actingAs($user)
            ->get(route('meta-deliveries.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('MetaDeliveries/Index')
                ->where('metaDeliveries.available', true)
                ->where('metaDeliveries.counts.contacts', 3)
                ->where('metaDeliveries.counts.sent', 1)
                ->where('metaDeliveries.counts.skipped', 1)
                ->where('metaDeliveries.counts.failed', 1)
                ->where('metaDeliveries.counts.untracked', 1)
                ->has('metaDeliveries.contacts', 3)
                ->has('metaDeliveries.legacy_deliveries', 1));

        $response = $this->actingAs($user)
            ->getJson(route('meta-deliveries.data'))
            ->assertOk()
            ->assertJsonPath('counts.contacts', 3)
            ->assertJsonPath('counts.untracked', 1);

        $contacts = collect($response->json('contacts'))->keyBy('id');
        $this->assertSame('sent', $contacts[10]['status']);
        $this->assertSame(1, $contacts[10]['events_received']);
        $this->assertSame('marketing_consent_missing', $contacts[11]['skip_reason']);
        $this->assertSame('untracked', $contacts[12]['status']);
    }
}
