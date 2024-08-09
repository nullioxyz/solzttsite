<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class ContentType extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'content_type';

    protected $fillable = [
        'name',
        'created_at',
        'updated_at'
    ];

    public $timestamps = true;

    const TATTOO = 1;
}
