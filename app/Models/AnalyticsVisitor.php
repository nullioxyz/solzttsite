<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnalyticsVisitor extends Model
{
    use HasFactory;

    protected $table = 'analytics_visitors';

    protected $fillable = [
        'visitor_id',
        'first_seen_at',
        'last_seen_at',
        'last_visit_started_at',
        'visit_count',
        'event_count',
        'last_session_key',
        'last_ip_address',
        'last_country_code',
        'last_country_name',
        'last_city',
        'last_timezone',
        'last_browser',
        'last_os',
        'last_device_type',
        'last_referrer_host',
        'last_traffic_source',
        'last_utm_source',
        'consent_preferences',
    ];

    protected $casts = [
        'first_seen_at' => 'datetime',
        'last_seen_at' => 'datetime',
        'last_visit_started_at' => 'datetime',
        'consent_preferences' => 'array',
    ];
}
