<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioLang extends Model
{
    
    protected $table = 'portfolio_lang';

    protected $fillable = [
        'portfolio_id',
        'language_id',
        'title',
        'slug'
    ];

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
