<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class QueueMonitorService
{
    public function snapshot(int $limit = 50): array
    {
        $now = now()->timestamp;
        $hasJobsTable = Schema::hasTable('jobs');
        $hasFailedJobsTable = Schema::hasTable('failed_jobs');

        $counts = [
            'running' => 0,
            'pending' => 0,
            'scheduled' => 0,
            'failed' => 0,
        ];
        $jobs = [];
        $failedJobs = [];

        if ($hasJobsTable) {
            $counts['running'] = DB::table('jobs')->whereNotNull('reserved_at')->count();
            $counts['pending'] = DB::table('jobs')
                ->whereNull('reserved_at')
                ->where('available_at', '<=', $now)
                ->count();
            $counts['scheduled'] = DB::table('jobs')
                ->whereNull('reserved_at')
                ->where('available_at', '>', $now)
                ->count();

            $jobs = DB::table('jobs')
                ->orderByRaw('CASE WHEN reserved_at IS NULL THEN 1 ELSE 0 END')
                ->orderByDesc('reserved_at')
                ->orderByDesc('created_at')
                ->limit($limit)
                ->get()
                ->map(fn ($job) => [
                    'id' => $job->id,
                    'queue' => $job->queue,
                    'name' => $this->jobName($job->payload),
                    'status' => $this->jobStatus($job, $now),
                    'attempts' => (int) $job->attempts,
                    'created_at' => $this->timestamp($job->created_at),
                    'available_at' => $this->timestamp($job->available_at),
                    'reserved_at' => $this->timestamp($job->reserved_at),
                ])
                ->all();
        }

        if ($hasFailedJobsTable) {
            $counts['failed'] = DB::table('failed_jobs')->count();
            $failedJobs = DB::table('failed_jobs')
                ->orderByDesc('failed_at')
                ->limit($limit)
                ->get()
                ->map(fn ($job) => [
                    'id' => $job->id,
                    'uuid' => $job->uuid,
                    'connection' => $job->connection,
                    'queue' => $job->queue,
                    'name' => $this->jobName($job->payload),
                    'error' => $this->safeExceptionSummary($job->exception),
                    'failed_at' => Carbon::parse($job->failed_at)->toIso8601String(),
                ])
                ->all();
        }

        return [
            'available' => $hasJobsTable && $hasFailedJobsTable,
            'connection' => config('queue.default'),
            'counts' => $counts,
            'jobs' => $jobs,
            'failed_jobs' => $failedJobs,
            'updated_at' => now()->toIso8601String(),
        ];
    }

    private function jobName(string $payload): string
    {
        $decoded = json_decode($payload, true);
        $name = is_array($decoded)
            ? ($decoded['displayName'] ?? data_get($decoded, 'data.commandName') ?? $decoded['job'] ?? null)
            : null;

        if (! is_string($name) || $name === '') {
            return 'Unknown job';
        }

        return class_basename(Str::before($name, '@'));
    }

    private function jobStatus(object $job, int $now): string
    {
        if ($job->reserved_at !== null) {
            return 'running';
        }

        return (int) $job->available_at > $now ? 'scheduled' : 'pending';
    }

    private function timestamp(mixed $timestamp): ?string
    {
        if ($timestamp === null) {
            return null;
        }

        return Carbon::createFromTimestamp((int) $timestamp)->toIso8601String();
    }

    private function safeExceptionSummary(string $exception): string
    {
        $firstLine = trim(Str::before($exception, "\n"));
        $firstLine = preg_replace('/\s+\(Connection:.*$/i', '', $firstLine) ?? $firstLine;
        $firstLine = preg_replace('/\s+at\s+\/[^\s]+:\d+.*$/i', '', $firstLine) ?? $firstLine;

        return Str::limit($firstLine !== '' ? $firstLine : 'Job failed', 300);
    }
}
