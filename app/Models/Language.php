<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;


class Language extends Model
{

    use HasFactory, SoftDeletes;

    protected $table = 'language';
    
    protected $fillable = [
        'name',
        'default',
        'slug',
        'created_at',
        'updated_at'
    ];

    public $timestamps = true;

    public function scopeActive(Builder $query)
    {
        $query->where('active', 1);
    }

}
