<?php

namespace App\Console;

use App\Models\MetaConversionDelivery;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Schema;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->command(
            'queue:work database --queue=analytics,default --stop-when-empty --tries=4 --timeout=90'
        )
            ->everyMinute()
            ->withoutOverlapping(5)
            ->name('drain-application-queues');

        $schedule->call(function () {
            if (!Schema::hasTable('meta_conversion_deliveries')) {
                return;
            }

            MetaConversionDelivery::query()
                ->where('created_at', '<', now()->subDays(
                    max(1, (int) config('services.facebook.delivery_retention_days', 30))
                ))
                ->delete();
        })->dailyAt('03:30')->name('purge-meta-conversion-deliveries');

        $schedule->command('queue:prune-failed --hours=168')
            ->dailyAt('03:45')
            ->name('prune-failed-queue-jobs');
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
