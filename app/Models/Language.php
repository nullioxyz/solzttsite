<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Language extends Model
{
    use HasFactory;

    use HasFactory, SoftDeletes;

    protected $table = 'language';
    
    protected $fillable = [
        'name',
        'logo',
        'slug',
        'created_at',
        'updated_at'
    ];

    public $timestamps = true;
}
