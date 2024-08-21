<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function index(Request $request)
    {
        $portfolio = Portfolio::with(
            [
                'media' =>  function($query) {
                    $query->orderBy('order_column', 'asc');
                },
                'defaultTranslation',
                'translation'
            ]
            )->whereHas(
                'media', function($query) {
                $query->orderBy('order_column', 'asc');
            }
        )->paginate(4);

        return response()->json(['portfolio' => $portfolio]);
    }

    

}
