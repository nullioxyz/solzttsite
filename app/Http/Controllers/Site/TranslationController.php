<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Institucional;
use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cookie;
use Inertia\Inertia;

class TranslationController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function getTranslations()
    {
        $locale = Cookie::get('locale') ?? App::getLocale();
        
        $filePath = resource_path("lang/{$locale}/site.php");
        
        if (!file_exists($filePath)) {
            return response()->json(['error' => 'Translations not found'], 404);
        }

        $translations = require $filePath;
        
        return response()->json($translations);
    }

    public function setLanguage(Request $request)
    {
        try {

            $locale = $request->lang;
            App::setLocale($locale);

            $cookie = cookie()->forever('locale', $locale);
            
            return response()->json(['message' => 'Language set successfully'])
            ->cookie($cookie);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to set language'], 500);
        }
    }
}
