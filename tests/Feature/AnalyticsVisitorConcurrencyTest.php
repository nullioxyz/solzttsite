<?php

namespace Tests\Feature;

use App\Models\AnalyticsVisitor;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\URL;
use Tests\TestCase;

class AnalyticsVisitorConcurrencyTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        config()->set('database.default', 'sqlite');
        config()->set('database.connections.sqlite.database', ':memory:');
        config()->set('services.geoip.enabled', false);
        DB::purge('sqlite');
        $this->app->detectEnvironment(fn () => 'production');

        Schema::create('analytics_visitors', function (Blueprint $table) {
            $table->id();
            $table->string('visitor_id', 128)->unique();
            $table->timestamp('first_seen_at')->nullable();
            $table->timestamp('last_seen_at')->nullable();
            $table->timestamp('last_visit_started_at')->nullable();
            $table->unsignedInteger('visit_count')->default(0);
            $table->unsignedInteger('event_count')->default(0);
            $table->string('last_session_key', 128)->nullable();
            $table->string('last_ip_address', 45)->nullable();
            $table->string('last_country_code', 2)->nullable();
            $table->string('last_country_name', 80)->nullable();
            $table->string('last_city', 120)->nullable();
            $table->string('last_timezone', 64)->nullable();
            $table->string('last_browser', 80)->nullable();
            $table->string('last_os', 80)->nullable();
            $table->string('last_device_type', 20)->nullable();
            $table->string('last_referrer_host', 255)->nullable();
            $table->string('last_traffic_source', 80)->nullable();
            $table->string('last_utm_source', 120)->nullable();
            $table->json('consent_preferences')->nullable();
            $table->timestamps();
        });

        Schema::create('analytics_events', function (Blueprint $table) {
            $table->id();
            $table->string('event_name', 80);
            $table->string('page_key', 80)->nullable();
            $table->string('page_path', 255)->nullable();
            $table->string('page_location', 500)->nullable();
            $table->string('page_title', 255)->nullable();
            $table->string('locale', 10)->nullable();
            $table->string('session_key', 128)->nullable();
            $table->string('visitor_id', 128)->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->string('source', 50)->default('site');
            $table->string('ip_hash', 64)->nullable();
            $table->string('country_code', 2)->nullable();
            $table->string('country_name', 80)->nullable();
            $table->string('city', 120)->nullable();
            $table->string('timezone', 64)->nullable();
            $table->string('browser', 80)->nullable();
            $table->string('os', 80)->nullable();
            $table->string('device_type', 20)->nullable();
            $table->boolean('is_returning')->default(false);
            $table->string('referrer', 500)->nullable();
            $table->string('referrer_host', 255)->nullable();
            $table->string('traffic_source', 80)->nullable();
            $table->string('utm_source', 120)->nullable();
            $table->string('utm_medium', 120)->nullable();
            $table->string('utm_campaign', 120)->nullable();
            $table->string('utm_content', 120)->nullable();
            $table->string('utm_term', 120)->nullable();
            $table->json('payload')->nullable();
            $table->json('consent_preferences')->nullable();
            $table->timestamp('occurred_at');
            $table->timestamps();
        });
    }

    public function test_multiple_events_reuse_one_visitor_and_update_counters_atomically(): void
    {
        $visitorId = 'f5105c6b-0d79-4b70-b541-21562c409442';
        $sessionKey = 'f3f3fb02-9f19-4827-b021-e00f725974c4';
        $firstVisitAt = now()->subHour();
        $endpoint = URL::temporarySignedRoute(
            'analytics.collect',
            now()->addMinutes(5),
            absolute: false,
        );
        $basePayload = [
            'page_key' => 'home',
            'page_location' => 'http://localhost/pt',
            'locale' => 'pt',
            'session_key' => $sessionKey,
            'visitor_id' => $visitorId,
            'consent_preferences' => [
                'necessary' => true,
                'analytics' => true,
                'marketing' => true,
            ],
        ];

        $this->postJson($endpoint, $basePayload + [
            'event_name' => 'site_page_view',
            'occurred_at' => $firstVisitAt->toIso8601String(),
        ])->assertOk();

        $this->postJson($endpoint, $basePayload + [
            'event_name' => 'page_home',
            'occurred_at' => $firstVisitAt->copy()->addSecond()->toIso8601String(),
        ])->assertOk();

        $this->postJson($endpoint, $basePayload + [
            'event_name' => 'site_page_view',
            'occurred_at' => now()->subMinutes(20)->toIso8601String(),
        ])->assertOk();

        $this->assertSame(1, AnalyticsVisitor::query()->where('visitor_id', $visitorId)->count());

        $visitor = AnalyticsVisitor::query()->where('visitor_id', $visitorId)->firstOrFail();
        $this->assertSame(3, $visitor->event_count);
        $this->assertSame(2, $visitor->visit_count);
        $this->assertSame($sessionKey, $visitor->last_session_key);
        $this->assertSame(3, DB::table('analytics_events')->where('visitor_id', $visitorId)->count());
        $this->assertSame(1, DB::table('analytics_events')->where('is_returning', true)->count());
    }
}
