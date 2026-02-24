<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('analytics_events', function (Blueprint $table) {
            $table->string('visitor_id', 128)->nullable()->after('session_key')->index();
            $table->string('ip_hash', 64)->nullable()->after('source')->index();
            $table->string('country_code', 2)->nullable()->after('ip_hash')->index();
            $table->string('country_name', 80)->nullable()->after('country_code');
            $table->string('city', 120)->nullable()->after('country_name')->index();
            $table->string('timezone', 64)->nullable()->after('city')->index();
            $table->boolean('is_returning')->default(false)->after('timezone')->index();
            $table->json('consent_preferences')->nullable()->after('payload');
        });
    }

    public function down(): void
    {
        Schema::table('analytics_events', function (Blueprint $table) {
            $table->dropColumn([
                'visitor_id',
                'ip_hash',
                'country_code',
                'country_name',
                'city',
                'timezone',
                'is_returning',
                'consent_preferences',
            ]);
        });
    }
};
