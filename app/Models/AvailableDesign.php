<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class AvailableDesign extends Model implements HasMedia
{
    use SoftDeletes, HasFactory, InteractsWithMedia;
    
    protected $table = 'available_design';

    protected $fillable = [
        'content_type_id',
        'category_id',
        'active',
        'available',
        'slug'
    ];

    public $timestamps = true;

    public function langs(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(AvailableDesignLang::class, 'available_design_id');
    }

    public function defaultTranslation()
    {
        return $this->hasOne(AvailableDesignLang::class, 'available_design_id')
            ->whereHas('language', function ($query) {
                $query->where('default', 1);
            });
    }

    public function translation()
    {
        $locale = Session::get('locale') || Cookie::get('locale');

        return $this->hasOne(AvailableDesignLang::class, 'available_design_id')
            ->whereHas('language', function ($query) use ($locale) {
                $query->where('slug', $locale);
            });
    }

    public function category(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function contact(): \Illuminate\Database\Eloquent\Relations\MorphTo
    {
        return $this->morphTo();
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