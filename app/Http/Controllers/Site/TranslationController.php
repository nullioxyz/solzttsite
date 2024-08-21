<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Institucional;
use App\Models\Language;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;

class TranslationController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function getTranslations()
    {
        $locale = App::getLocale();

        $filePath = resource_path("lang/{$locale}/site.php");

        if (!file_exists($filePath)) {
            return response()->json(['error' => 'Translations not found'], 404);
        }

        $translations = require $filePath;

        return response()->json($translations);
    }
}
