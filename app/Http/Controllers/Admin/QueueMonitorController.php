<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\QueueMonitorService;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class QueueMonitorController extends Controller
{
    public function __construct(private readonly QueueMonitorService $queueMonitor) {}

    public function index(): Response
    {
        return Inertia::render('QueueMonitor/Index', [
            'queueMonitor' => $this->queueMonitor->snapshot(),
        ]);
    }

    public function data(): JsonResponse
    {
        return response()->json($this->queueMonitor->snapshot());
    }
}
