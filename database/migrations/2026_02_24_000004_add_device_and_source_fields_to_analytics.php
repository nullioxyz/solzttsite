<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('analytics_events', function (Blueprint $table) {
            $table->string('ip_address', 45)->nullable()->after('visitor_id')->index();
            $table->string('browser', 80)->nullable()->after('timezone')->index();
            $table->string('os', 80)->nullable()->after('browser');
            $table->string('device_type', 20)->nullable()->after('os')->index();
            $table->string('referrer_host', 255)->nullable()->after('referrer')->index();
            $table->string('traffic_source', 80)->nullable()->after('referrer_host')->index();
            $table->string('utm_source', 120)->nullable()->after('traffic_source')->index();
            $table->string('utm_medium', 120)->nullable()->after('utm_source');
            $table->string('utm_campaign', 120)->nullable()->after('utm_medium');
            $table->string('utm_content', 120)->nullable()->after('utm_campaign');
            $table->string('utm_term', 120)->nullable()->after('utm_content');
        });

        Schema::table('analytics_visitors', function (Blueprint $table) {
            $table->string('last_ip_address', 45)->nullable()->after('last_session_key');
            $table->string('last_browser', 80)->nullable()->after('last_ip_address');
            $table->string('last_os', 80)->nullable()->after('last_browser');
            $table->string('last_device_type', 20)->nullable()->after('last_os');
            $table->string('last_referrer_host', 255)->nullable()->after('last_timezone');
            $table->string('last_traffic_source', 80)->nullable()->after('last_referrer_host');
            $table->string('last_utm_source', 120)->nullable()->after('last_traffic_source');
        });
    }

    public function down(): void
    {
        Schema::table('analytics_events', function (Blueprint $table) {
            $table->dropColumn([
                'ip_address',
                'browser',
                'os',
                'device_type',
                'referrer_host',
                'traffic_source',
                'utm_source',
                'utm_medium',
                'utm_campaign',
                'utm_content',
                'utm_term',
            ]);
        });

        Schema::table('analytics_visitors', function (Blueprint $table) {
            $table->dropColumn([
                'last_ip_address',
                'last_browser',
                'last_os',
                'last_device_type',
                'last_referrer_host',
                'last_traffic_source',
                'last_utm_source',
            ]);
        });
    }
};
