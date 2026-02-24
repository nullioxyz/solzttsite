<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('analytics_visitors', function (Blueprint $table) {
            $table->id();
            $table->string('visitor_id', 128)->unique();
            $table->timestamp('first_seen_at')->nullable()->index();
            $table->timestamp('last_seen_at')->nullable()->index();
            $table->timestamp('last_visit_started_at')->nullable();
            $table->unsignedInteger('visit_count')->default(0);
            $table->unsignedInteger('event_count')->default(0);
            $table->string('last_session_key', 128)->nullable();
            $table->string('last_country_code', 2)->nullable();
            $table->string('last_country_name', 80)->nullable();
            $table->string('last_city', 120)->nullable();
            $table->string('last_timezone', 64)->nullable();
            $table->json('consent_preferences')->nullable();
            $table->timestamps();

            $table->index('visit_count');
            $table->index(['last_country_code', 'last_seen_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('analytics_visitors');
    }
};
