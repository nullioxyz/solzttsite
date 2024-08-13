<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Institucional;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

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
