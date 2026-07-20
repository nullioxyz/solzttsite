<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\MetaDeliveryMonitorService;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class MetaDeliveryController extends Controller
{
    public function __construct(private readonly MetaDeliveryMonitorService $monitor) {}

    public function index(): Response
    {
        return Inertia::render('MetaDeliveries/Index', [
            'metaDeliveries' => $this->monitor->snapshot(),
        ]);
    }

    public function data(): JsonResponse
    {
        return response()->json($this->monitor->snapshot());
    }
}
