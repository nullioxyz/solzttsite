<?php

namespace App\Traits;

use Illuminate\Http\Request;

trait PaginationTrait
{
    public function perPage(Request $request)
    {
        return $request->has('home') ? self::PER_PAGE_HOME : self::PER_PAGE_INTERNAL;
    }
}