<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Institucional;
use App\Models\Portfolio;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function index()
    {
        $institucional = Institucional::where('slug', 'solztt-universe')->with('defaultTranslation', 'media')->first();
        $institucional->getMedia();

        return Inertia::render('Site/Index', [
            'institucional' => $institucional
        ]);
    }

    

}
