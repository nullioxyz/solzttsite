<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;

class LanguageMiddleware
{
    public function handle($request, Closure $next)
    {
        if (Session::has('locale') || Cookie::get('locale')) {
            App::setLocale(Session::get('locale') ?? Cookie::get('locale'));
        } else {
            App::setLocale('en');
        }

        return $next($request);
    }
}
