<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Contact extends Model
{
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

    public function contentType(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(ContentType::class, 'content_type_id');
    }
}
