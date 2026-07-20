<?php

namespace App\Jobs;

use App\Services\Meta\MetaConversionsApiClient;
use App\Models\MetaConversionDelivery;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Client\RequestException;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Throwable;

class SendMetaConversionJob implements ShouldQueue, ShouldBeUnique
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 4;

    public int $timeout = 15;

    public int $uniqueFor = 3600;

    public function __construct(public readonly array $event)
    {
        $this->onQueue('analytics');
    }

    public function backoff(): array
    {
        return [60, 300, 900];
    }

    public function uniqueId(): string
    {
        return ($this->event['event_name'] ?? 'unknown') . ':' . ($this->event['event_id'] ?? 'missing');
    }

    public function handle(MetaConversionsApiClient $client): void
    {
        if (!filter_var(config('services.facebook.capi_enabled'), FILTER_VALIDATE_BOOL)) {
            MetaConversionDelivery::query()->updateOrCreate(
                ['event_id' => $this->event['event_id']],
                [
                    'event_name' => $this->event['event_name'],
                    'status' => 'skipped',
                    'skip_reason' => 'capi_disabled_at_processing',
                ],
            );

            return;
        }

        $delivery = MetaConversionDelivery::query()->firstOrCreate(
            ['event_id' => $this->event['event_id']],
            [
                'event_name' => $this->event['event_name'],
                'status' => 'processing',
            ],
        );

        if ($delivery->status === 'sent') {
            return;
        }

        $delivery->increment('attempts');
        $delivery->forceFill([
            'status' => 'processing',
            'skip_reason' => null,
            'last_attempt_at' => now(),
            'last_error' => null,
        ])->save();

        try {
            $response = $client->send($this->event);

            $delivery->forceFill([
                'status' => 'sent',
                'events_received' => isset($response['events_received']) ? (int) $response['events_received'] : null,
                'trace_id' => $response['fbtrace_id'] ?? null,
                'sent_at' => now(),
                'last_error' => null,
            ])->save();
        } catch (Throwable $exception) {
            $delivery->forceFill([
                'status' => 'retrying',
                'last_error' => $this->safeErrorSummary($exception),
            ])->save();

            throw $exception;
        }
    }

    public function failed(Throwable $exception): void
    {
        MetaConversionDelivery::query()
            ->where('event_id', $this->event['event_id'] ?? '')
            ->update([
                'status' => 'failed',
                'last_error' => $this->safeErrorSummary($exception),
                'updated_at' => now(),
            ]);

        Log::warning('Meta CAPI event delivery failed.', [
            'event_name' => $this->event['event_name'] ?? null,
            'event_id' => $this->event['event_id'] ?? null,
            'exception' => $exception::class,
        ]);
    }

    private function safeErrorSummary(Throwable $exception): string
    {
        $status = $exception instanceof RequestException
            ? ':http_' . $exception->response->status()
            : '';

        return substr($exception::class . $status, 0, 255);
    }
}
