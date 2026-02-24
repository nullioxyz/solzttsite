<?php

namespace App\Http\Middleware;

use App\Models\Language;
use Closure;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class LanguageMiddleware
{
    public function handle($request, Closure $next)
    {
        $routeLocale = $request->route('locale');
        $requestedLocale = $routeLocale ?? Session::get('locale') ?? Cookie::get('locale');
        $defaultLocale = config('app.fallback_locale', 'en');

        $locale = $defaultLocale;

        if ($routeLocale) {
            $isRouteLocaleAllowed = Language::query()
                ->where('slug', $routeLocale)
                ->exists();

            if (!$isRouteLocaleAllowed) {
                throw new NotFoundHttpException();
            }
        }

        if ($requestedLocale) {
            $isAllowedLocale = Language::query()
                ->where('slug', $requestedLocale)
                ->exists();

            if ($isAllowedLocale) {
                $locale = $requestedLocale;
            }
        }

        App::setLocale($locale);
        Session::put('locale', $locale);

        return $next($request)->cookie(cookie()->forever('locale', $locale));
    }
}
