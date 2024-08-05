<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class SiteSetting extends Model
{
    use SoftDeletes, HasFactory;
    
    protected $table = 'site_setting';

    protected $fillable = [
        'title',
        'slug',
        'description',
        'night_mode'
    ];
}
