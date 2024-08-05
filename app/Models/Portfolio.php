<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Portfolio extends Model implements HasMedia
{
    use SoftDeletes, HasFactory, InteractsWithMedia;
    
    protected $table = 'portfolio';

    protected $fillable = [
        'content_type_id',
        'category_id',
        'active',
        'slug'
    ];

    public $timestamps = true;


    public function langs(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(PortfolioLang::class, 'portfolio_id');
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
