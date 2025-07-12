<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Institucional;
use App\Models\Language;
use App\Models\Portfolio;
use App\Models\SiteSetting;
use App\Models\Social;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Inertia\Inertia;

class AfterCareController extends Controller
{
    public function index()
    {
        $institucional = Institucional::where('slug', 'after-care')
            ->with('defaultTranslation.language', 'translation.language', 'media')
            ->first();

        $availableLangs = Language::select('slug', 'name', 'default')->get();
        $defaultLang = $availableLangs->firstWhere('default', 1);

        $socials = Social::get()->keyBy('name');
        $social['instagram'] = $socials->get('instagram');
        $social['facebook'] = $socials->get('facebook');

        $metatags = SiteSetting::with(['defaultTranslation.language', 'translation.language'])->where('slug', 'default-conf')->first();
        
        return Inertia::render('Site/AfterCare/Index', [
            'institucional' => $institucional,
            'languages' => $availableLangs,
            'defaultLang' => $defaultLang,
            'metatags' => $metatags,
            'currentLanguage' => Language::where('slug', Cookie::get('locale'))->first() ?? $defaultLang,
            'social' => $social
        ]);
    }    
}
