<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class QueueMonitorTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        Carbon::setTestNow('2026-07-20 12:00:00');
        config()->set('queue.default', 'database');

        Schema::create('jobs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('queue');
            $table->longText('payload');
            $table->unsignedTinyInteger('attempts');
            $table->unsignedInteger('reserved_at')->nullable();
            $table->unsignedInteger('available_at');
            $table->unsignedInteger('created_at');
        });

        Schema::create('failed_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('uuid')->unique();
            $table->text('connection');
            $table->text('queue');
            $table->longText('payload');
            $table->longText('exception');
            $table->timestamp('failed_at');
        });
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();

        parent::tearDown();
    }

    public function test_queue_monitor_requires_authentication(): void
    {
        $this->get(route('queue-monitor.index'))
            ->assertRedirect(route('login'));

        $this->getJson(route('queue-monitor.data'))
            ->assertUnauthorized();
    }

    public function test_admin_can_view_jobs_grouped_by_queue_state(): void
    {
        $now = now()->timestamp;

        $runningId = $this->insertJob('App\\Jobs\\RunningJob', [
            'attempts' => 1,
            'reserved_at' => $now - 5,
            'available_at' => $now - 10,
        ]);
        $pendingId = $this->insertJob('App\\Jobs\\PendingJob', [
            'available_at' => $now - 1,
        ]);
        $scheduledId = $this->insertJob('App\\Jobs\\ScheduledJob', [
            'available_at' => $now + 300,
        ]);

        DB::table('failed_jobs')->insert([
            'uuid' => '1de7ec13-f909-4a22-8c38-a095b8bd07a3',
            'connection' => 'database',
            'queue' => 'default',
            'payload' => json_encode([
                'displayName' => 'App\\Jobs\\FailedJob',
                'data' => ['secret' => 'payload-secret'],
            ], JSON_THROW_ON_ERROR),
            'exception' => '[object] (RuntimeException(code: 0): Delivery failed (Connection: mysql, SQL: insert into contacts (email) values (secret@example.com)))'."\n[stacktrace]",
            'failed_at' => now(),
        ]);

        $user = User::factory()->make(['id' => 1]);

        $this->actingAs($user)
            ->get(route('queue-monitor.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('QueueMonitor/Index')
                ->where('queueMonitor.connection', 'database')
                ->where('queueMonitor.available', true)
                ->where('queueMonitor.counts.running', 1)
                ->where('queueMonitor.counts.pending', 1)
                ->where('queueMonitor.counts.scheduled', 1)
                ->where('queueMonitor.counts.failed', 1)
                ->has('queueMonitor.jobs', 3)
                ->has('queueMonitor.failed_jobs', 1));

        $response = $this->actingAs($user)
            ->getJson(route('queue-monitor.data'))
            ->assertOk()
            ->assertJsonPath('counts.running', 1)
            ->assertJsonPath('counts.pending', 1)
            ->assertJsonPath('counts.scheduled', 1)
            ->assertJsonPath('counts.failed', 1)
            ->assertJsonMissingPath('jobs.0.payload')
            ->assertJsonMissingPath('failed_jobs.0.payload')
            ->assertJsonMissingPath('failed_jobs.0.exception');

        $jobsById = collect($response->json('jobs'))->keyBy('id');

        $this->assertSame('running', $jobsById[$runningId]['status']);
        $this->assertSame('RunningJob', $jobsById[$runningId]['name']);
        $this->assertSame('pending', $jobsById[$pendingId]['status']);
        $this->assertSame('scheduled', $jobsById[$scheduledId]['status']);
        $this->assertStringNotContainsString('payload-secret', $response->getContent());
        $this->assertStringNotContainsString('secret@example.com', $response->getContent());
        $this->assertStringNotContainsString('[stacktrace]', $response->getContent());
    }

    private function insertJob(string $displayName, array $overrides = []): int
    {
        return DB::table('jobs')->insertGetId(array_merge([
            'queue' => 'default',
            'payload' => json_encode([
                'displayName' => $displayName,
                'data' => ['secret' => 'payload-secret'],
            ], JSON_THROW_ON_ERROR),
            'attempts' => 0,
            'reserved_at' => null,
            'available_at' => now()->timestamp,
            'created_at' => now()->timestamp,
        ], $overrides));
    }
}
