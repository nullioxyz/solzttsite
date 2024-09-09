<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Theme extends Model
{
    use HasFactory;
    
    protected $table = 'theme';

    protected $fillable = [
        'title',
        'slug',
        'created_at',
        'updated_at',
        'deleted_at'
    ];
}
