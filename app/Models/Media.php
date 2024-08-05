<?php

namespace App\Models;

use Spatie\MediaLibrary\MediaCollections\Models\Media as BaseMedia;

class Media extends BaseMedia
{
    protected $table = 'media';

    protected $fillable = [
        'model',
        'uuid',
        'collection_name',
        'name',
        'file_name',
        'mime_type',
        'disk',
        'conversion_disk',
        'size',
        'manipulations',
        'custom_properties',
        'generated_conversions',
        'responsive_images',
        'order_column'
    ];

    public $timestamps = true;

    public function langs(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(MediaDescriptionLang::class, 'media_id');
    }

    public function defaultTranslation()
    {
        return $this->langs()
            ->whereHas('language', function ($query) {
                $query->where('default', true);
            })
            ->first();
    }

}
