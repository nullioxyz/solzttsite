<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\ContentType;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cookie;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;


class Institucional extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia;
    
    protected $table = 'institucional';

    protected $fillable = [
        'language_id',
        'content_type_id',
        'title',
        'subtitle',
        'description',
        'slug',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'created_at'  => 'date:d-m-Y H:i',
        'updated_at' => 'date:d-m-Y H:i',
    ];

    public $timestamps = true;

    public function langs(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(InstitucionalLang::class, 'institucional_id');
    }

    public function defaultTranslation()
    {
        return $this->hasOne(InstitucionalLang::class, 'institucional_id')
            ->whereHas('language', function ($query) {
                $query->where('default', true);
            });
    }

    public function translation()
    {
        $locale = Cookie::get('locale');

        return $this->hasOne(InstitucionalLang::class, 'institucional_id')
            ->whereHas('language', function ($query) use ($locale) {
                $query->where('slug', $locale);
            });
    }

    public function contentType(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(ContentType::class, 'content_type_id');
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
