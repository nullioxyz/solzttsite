<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Institucional;
use App\Models\Language;
use App\Models\SiteSetting;
use App\Models\Social;
use Illuminate\Support\Facades\Cookie;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function index($locale)
    {
        $institucional = Institucional::where('id', 1)
            ->with('defaultTranslation.language', 'translation.language', 'media')
            ->first();

        $metaImage = Institucional::where('id', 11)
            ->with('media')
            ->first();
    
        $availableLangs = Language::select('slug', 'name', 'default')->get();
        $defaultLang = $availableLangs->firstWhere('default', 1);

        $socials = Social::get()->keyBy('name');
        $social['instagram'] = $socials->get('instagram');
        $social['facebook'] = $socials->get('facebook');

        $metatags = SiteSetting::with(['defaultTranslation.language', 'translation.language'])->where('id', 1)->first();
        
        return Inertia::render('Site/Index', [
            'institucional' => $institucional,
            'languages' => $availableLangs,
            'defaultLang' => $defaultLang,
            'social' => $social,
            'metatags' => $metatags,
            'metaImage' => $metaImage,
            'currentLanguage' => Language::where('slug', Cookie::get('locale'))->first() ?? $defaultLang
        ]);
    }
}
