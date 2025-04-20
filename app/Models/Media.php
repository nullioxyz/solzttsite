<?php

namespace App\Models;

use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Storage;
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

    protected $appends = [
        'url'
    ];

    public $timestamps = true;

    public function langs(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(MediaDescriptionLang::class, 'media_id');
    }

    public function defaultTranslation()
    {
        return $this->hasOne(MediaDescriptionLang::class, 'media_id')
            ->whereHas('language', function ($query) {
                $query->where('default', true);
            });
    }

    public function translation()
    {
        $locale = Cookie::get('locale');

        return $this->hasOne(MediaDescriptionLang::class, 'media_id')
            ->whereHas('language', function ($query) use ($locale) {
                $query->where('slug', $locale);
            });
    }

    public function getUrlAttribute()
    {
        if (app()->environment() !== 'local') {

            if(! Storage::disk($this->disk)->exists($this->id . '/' . $this->file_name)) {
                return;
            }

            return Storage::disk($this->disk)->url($this->id . '/' . $this->file_name);
        }

        return asset('storage/' . $this->id . '/' . $this->file_name);
    }
    

}
