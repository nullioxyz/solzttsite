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
        Schema::create('media_description_lang', function (Blueprint $table) {
            $table->id();
            
            $table->unsignedBigInteger('language_id');
            $table->foreign('language_id')->references('id')->on('language');

            $table->unsignedBigInteger('media_id');
            $table->foreign('media_id')->references('id')->on('media');

            $table->text('description')->nullable();


            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media_description_lang');
    }
};
