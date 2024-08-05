<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class MediaDescriptionLang extends Model
{
   
    protected $table = 'media_description_lang';

    protected $fillable = [
        'media_id',
        'language_id',
        'description'
    ];
    
}
