<?php

namespace App\Http\Middleware;

use App\Models\Language;
use Closure;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;

class LanguageMiddleware
{
    public function handle($request, Closure $next)
    {
        $requestedLocale = Session::get('locale') ?? Cookie::get('locale');
        $defaultLocale = config('app.fallback_locale', 'en');

        $locale = $defaultLocale;
        if ($requestedLocale) {
            $isAllowedLocale = Language::query()
                ->where('slug', $requestedLocale)
                ->exists();

            if ($isAllowedLocale) {
                $locale = $requestedLocale;
            }
        }

        App::setLocale($locale);

        return $next($request);
    }
}
