<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class CategoryLang extends Model
{
    protected $table = 'category_lang';

    protected $fillable = [
        'category_id',
        'language_id',
        'title',
        'slug'
    ];
}
