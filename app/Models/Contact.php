<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Contact extends Model implements HasMedia
{
    use SoftDeletes, InteractsWithMedia;
    
    protected $table = 'contact';

    protected $fillable = [
        'content_type_id',
        'firstname',
        'lastname',
        'email',
        'phone',
        'contact_me_by',
        'tattoo_idea',
        'references',
        'size',
        'body_location',
        'gender',
        'city',
        'availability',
        'read'
    ];

    public $timestamps = true;

    public function portfolioReferences(): \Illuminate\Database\Eloquent\Relations\MorphToMany
    {
        return $this->morphedByMany(
            Portfolio::class,
            'referenceable',
            'contact_reference',
        );
    }

    public function reservedDesign(): \Illuminate\Database\Eloquent\Relations\MorphToMany
    {
        return $this->morphedByMany(
            AvailableDesign::class,
            'referenceable',
            'contact_reference'
        );
    }

    public function contentType(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(ContentType::class, 'content_type_id');
    }

    public function getRouteKeyName()
    {
        return 'id';
    }

    public function getCreatedAtAttribute()
    {
        return $this->attributes['created_at'] 
            ? $this->asDateTime($this->attributes['created_at'])->format('d/m/Y H:i')
            : null;
    }

}
