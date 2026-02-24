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
        'visitor_id',
        'ip_address',
        'source',
        'ip_hash',
        'country_code',
        'country_name',
        'city',
        'timezone',
        'browser',
        'os',
        'device_type',
        'is_returning',
        'referrer',
        'referrer_host',
        'traffic_source',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_content',
        'utm_term',
        'payload',
        'consent_preferences',
        'occurred_at',
    ];

    protected $casts = [
        'payload' => 'array',
        'consent_preferences' => 'array',
        'is_returning' => 'boolean',
        'occurred_at' => 'datetime',
    ];
}
