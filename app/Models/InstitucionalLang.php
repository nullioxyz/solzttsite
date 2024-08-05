<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class InstitucionalLang extends Model
{
    protected $table = 'institucional_lang';

    protected $fillable = [
        'institucional_id',
        'language_id',
        'title',
        'description',
        'slug'
    ];
}
