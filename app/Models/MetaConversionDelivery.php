<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MetaConversionDelivery extends Model
{
    protected $fillable = [
        'event_id',
        'event_name',
        'status',
        'attempts',
        'events_received',
        'trace_id',
        'last_error',
        'last_attempt_at',
        'sent_at',
    ];

    protected $casts = [
        'last_attempt_at' => 'datetime',
        'sent_at' => 'datetime',
    ];
}
