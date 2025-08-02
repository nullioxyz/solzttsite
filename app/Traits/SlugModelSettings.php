<?php

namespace App\Traits;

use Spatie\Sluggable\SlugOptions;

trait SlugModelSettings
{
    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom($this->slugFields)
            ->saveSlugsTo('slug');
    }
}