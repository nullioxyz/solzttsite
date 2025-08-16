<?php

namespace App\Models\Traits;

use App\Models\Media;


trait MediaConvertions
{
    public function registerMediaConversionsToModel(Media $media = null): void
    {
        $this
            ->addMediaConversion('lg')
            ->width(1920)
            ->format('jpg')
            ->quality(78);

        $this
            ->addMediaConversion('md')
            ->width(1280)
            ->format('jpg')
            ->quality(78);

        $this
            ->addMediaConversion('sm')
            ->width(768)
            ->format('jpg')
            ->quality(78);

        // Versões WebP
        $this
            ->addMediaConversion('lg-webp')
            ->width(1920)
            ->format('webp')
            ->quality(72);

        $this
            ->addMediaConversion('md-webp')
            ->width(1280)
            ->format('webp')
            ->quality(72);

        $this
            ->addMediaConversion('sm-webp')
            ->width(768)
            ->format('webp')
            ->quality(72);
    }

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection(self::MEDIA_COLLECTION)
            ->useDisk('spaces')
            ->withResponsiveImages();
    }
}
