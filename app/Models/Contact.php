<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Contact extends Model
{
    Use SoftDeletes;
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

    public function references(): \Illuminate\Database\Eloquent\Relations\MorphToMany
    {
        return $this->morphToMany(
            Portfolio::class,
            'referenceable',
            'contact_reference',
            'contact_id',
            'referenceable_id'
        )->withPivot('referenceable_type');
    }

    public function reservedDesign(): \Illuminate\Database\Eloquent\Relations\MorphToMany
    {
        return $this->morphToMany(
            AvailableDesign::class,
            'referenceable',
            'contact_reference',
            'contact_id',
            'referenceable_id'
        )->withPivot('referenceable_type');
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
