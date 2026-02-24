<?php

namespace App\Models;

use App\Models\Traits\MediaConvertions;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\App;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Portfolio extends Model implements HasMedia
{
    use SoftDeletes, HasFactory, InteractsWithMedia, MediaConvertions;
    
    protected $table = 'portfolio';

    const MEDIA_COLLECTION = 'portfolio';

    protected $fillable = [
        'content_type_id',
        'category_id',
        'active',
        'slug',
        'order',
    ];

    public $timestamps = true;

    public function registerMediaCollections(?Media $media = null): void
    {
        $this->registerMediaConversionsToModel($media);
    }

    public function langs(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(PortfolioLang::class, 'portfolio_id');
    }

    public function defaultTranslation()
    {
        return $this->hasOne(PortfolioLang::class, 'portfolio_id')
            ->whereHas('language', function ($query) {
                $query->where('default', true);
            });
    }

    public function translation()
    {
        $locale = App::getLocale();

        return $this->hasOne(PortfolioLang::class, 'portfolio_id')
            ->whereHas('language', function ($query) use ($locale) {
                $query->where('slug', $locale);
            });
    }

    public function category(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function contacts(): MorphToMany
    {
        return $this->morphedByMany(Contact::class, 'referenceable', 'contact_reference');
    }

    public function contentType(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(ContentType::class, 'content_type_id');
    }

    public function scopeActive(Builder $query)
    {
        $query->where('active', 1);
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
