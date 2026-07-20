<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MetaConversionDelivery extends Model
{
    protected $fillable = [
        'contact_id',
        'event_id',
        'event_name',
        'status',
        'skip_reason',
        'attempts',
        'events_received',
        'trace_id',
        'last_error',
        'queued_at',
        'last_attempt_at',
        'sent_at',
    ];

    protected $casts = [
        'queued_at' => 'datetime',
        'last_attempt_at' => 'datetime',
        'sent_at' => 'datetime',
    ];

    public function contact(): BelongsTo
    {
        return $this->belongsTo(Contact::class);
    }
}
