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

    protected $casts = [
        'created_at'  => 'date:d-m-Y H:i',
        'updated_at' => 'date:d-m-Y H:i',
    ];

    public $timestamps = true;

    public function langs(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(InstitucionalLang::class, 'institucional_id');
    }

    public function defaultTranslation()
    {
        return $this->institucionalLangs()
            ->whereHas('language', function ($query) {
                $query->where('default', true);
            })
            ->first();
    }

    public function contentType(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(ContentType::class, 'content_type_id');
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
