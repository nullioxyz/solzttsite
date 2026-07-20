<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
        'scheme' => 'https',
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'recaptcha' => [
        'site_key' => env('RECAPTCHA_SITE_KEY'),
        'secret_key' => env('RECAPTCHA_SECRET_KEY'),
        'project_id' => env('GOOGLE_CLOUD_PROJECT_ID'),
    ],

    'hcaptcha' => [
        'site_key' => env('HCAPTCHA_SITE_KEY'),
        'secret' => env('HCAPTCHA_SECRET'),
    ],

    'facebook' => [
        'pixel_id' => env('FACEBOOK_PIXEL_ID'),
        'pixel_enabled' => env('FACEBOOK_PIXEL_ENABLED', false),
        'capi_enabled' => env('FACEBOOK_CAPI_ENABLED', false),
        'access_token' => env('FACEBOOK_CAPI_ACCESS_TOKEN'),
        'graph_api_version' => env('FACEBOOK_GRAPH_API_VERSION', 'v25.0'),
        'test_event_code' => env('FACEBOOK_TEST_EVENT_CODE'),
        'timeout' => (int) env('FACEBOOK_CAPI_TIMEOUT', 5),
        'delivery_retention_days' => (int) env('FACEBOOK_DELIVERY_RETENTION_DAYS', 30),
    ],

    'google_analytics' => [
        'measurement_id' => env('GA_MEASUREMENT_ID', 'G-L1M0C8JWXT'),
        'enabled' => env('GA_ENABLED', false),
    ],

    'geoip' => [
        'enabled' => env('GEOIP_FALLBACK_ENABLED', false),
        'endpoint' => env('GEOIP_FALLBACK_ENDPOINT', 'https://ipapi.co/{ip}/json/'),
        'token' => env('GEOIP_FALLBACK_TOKEN'),
        'timeout' => env('GEOIP_FALLBACK_TIMEOUT', 2),
    ],

];
