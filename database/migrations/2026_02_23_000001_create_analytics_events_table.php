<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('analytics_events', function (Blueprint $table) {
            $table->id();
            $table->string('event_name', 80)->index();
            $table->string('page_key', 80)->nullable()->index();
            $table->string('page_path', 255)->nullable()->index();
            $table->string('page_location', 500)->nullable();
            $table->string('page_title', 255)->nullable();
            $table->string('locale', 10)->nullable()->index();
            $table->string('session_key', 128)->nullable()->index();
            $table->string('source', 50)->default('site')->index();
            $table->string('referrer', 500)->nullable();
            $table->json('payload')->nullable();
            $table->timestamp('occurred_at')->index();
            $table->timestamps();

            $table->index(['event_name', 'occurred_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('analytics_events');
    }
};
