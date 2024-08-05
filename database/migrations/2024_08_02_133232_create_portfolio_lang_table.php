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
        Schema::create('portfolio_lang', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('portfolio_id');
            $table->foreign('portfolio_id')->references('id')->on('portfolio');

            $table->unsignedBigInteger('language_id');
            $table->foreign('language_id')->references('id')->on('language');

            $table->string('title', 255);
            $table->string('slug', 255);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolio_lang');
    }
};
