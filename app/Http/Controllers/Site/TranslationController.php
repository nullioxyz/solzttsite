<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cookie;

class TranslationController extends Controller
{
    protected function getAllowedLocales(): array
    {
        return Language::query()->pluck('slug')->all();
    }

    protected function resolveLocale(?string $locale = null): string
    {
        $allowedLocales = $this->getAllowedLocales();
        $defaultLocale = Language::query()->where('default', 1)->value('slug')
            ?? config('app.fallback_locale', 'en');

        if ($locale && in_array($locale, $allowedLocales, true)) {
            return $locale;
        }

        return $defaultLocale;
    }

    /**
     * Display the user's profile form.
     */
    public function getTranslations()
    {
        $locale = $this->resolveLocale(Cookie::get('locale') ?? App::getLocale());
        
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
            $requestedLocale = $request->lang;
            if (!in_array($requestedLocale, $this->getAllowedLocales(), true)) {
                return response()->json(['error' => 'Invalid language'], 422);
            }

            $locale = $this->resolveLocale($requestedLocale);
            App::setLocale($locale);

            $cookie = cookie()->forever('locale', $locale);
            
            return response()->json(['message' => 'Language set successfully'])
            ->cookie($cookie);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to set language'], 500);
        }
    }

    public function getCurrentTranslation()
    {
        return response()->json([
            'lang' => $this->resolveLocale(Cookie::get('locale') ?? App::getLocale()),
        ]);
    }
}
