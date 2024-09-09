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
        Schema::create('site_setting_lang', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('site_setting_id');
            $table->foreign('site_setting_id')->references('id')->on('site_setting');

            $table->unsignedBigInteger('language_id');
            $table->foreign('language_id')->references('id')->on('language');

            $table->string('title', 255)->nullable();
            $table->text('description')->nullable();
            $table->text('keywords')->nullable();
            $table->string('slug', 255);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_setting_lang');
    }
};
