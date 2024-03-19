<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Language;
use App\Models\ContentType;


class Institucional extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $table = 'institucional';

    protected $fillable = [
        'language_id',
        'content_type_id',
        'title',
        'subtitle',
        'description',
        'slug',
        'created_at',
        'updated_at'
    ];

    public $timestamps = true;


    public function language(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Language::class, 'language_id');
    }

    public function contentType(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(ContentType::class, 'content_type_id');
    }
}
