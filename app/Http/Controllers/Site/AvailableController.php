<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\AvailableDesign;

class AvailableController extends Controller
{
    public function index()
    {
        $designs = AvailableDesign::with(
            [
                'media' =>  function($query) {
                    $query->orderBy('order_column', 'asc');
                },
                'defaultTranslation'
            ]
            )->whereHas(
                'media', function($query) {
                $query->orderBy('order_column', 'asc');
            }
        )
        ->active()
        ->paginate(4);

        return response()->json(['designs' => $designs]);
    }

}
