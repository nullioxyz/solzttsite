<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Category extends Model
{
    use SoftDeletes, HasFactory;
    
    protected $table = 'category';

    protected $fillable = [
        'content_type_id',
        'active',
        'slug'
    ];

    public $timestamps = true;


    public function langs(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(CategoryLang::class, 'category_id');
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
