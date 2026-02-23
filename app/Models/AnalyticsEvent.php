<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnalyticsEvent extends Model
{
    use HasFactory;

    protected $table = 'analytics_events';

    protected $fillable = [
        'event_name',
        'page_key',
        'page_path',
        'page_location',
        'page_title',
        'locale',
        'session_key',
        'source',
        'referrer',
        'payload',
        'occurred_at',
    ];

    protected $casts = [
        'payload' => 'array',
        'occurred_at' => 'datetime',
    ];
}
