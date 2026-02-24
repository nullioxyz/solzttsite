<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\AnalyticsMetricsService;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class AnalyticsController extends Controller
{
    public function __construct(private readonly AnalyticsMetricsService $metricsService)
    {
    }

    public function index(): Response
    {
        return Inertia::render('Analytics/Index', [
            'metrics' => $this->metricsService->build(),
            'tracking' => [
                'ga_enabled' => (app()->environment('production') || filter_var(env('ANALYTICS_ENABLE_LOCAL', false), FILTER_VALIDATE_BOOL)) && filled(config('services.google_analytics.measurement_id')),
                'meta_enabled' => (app()->environment('production') || filter_var(env('ANALYTICS_ENABLE_LOCAL', false), FILTER_VALIDATE_BOOL)) && filled(config('services.facebook.pixel_id')),
            ],
        ]);
    }

    public function metrics(): JsonResponse
    {
        return response()->json($this->metricsService->build());
    }
}
