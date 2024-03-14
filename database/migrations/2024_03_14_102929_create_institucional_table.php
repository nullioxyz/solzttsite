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
        Schema::create('institucional', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('content_type_id');
            $table->foreign('content_type_id')->references('id')->on('content_type');

            $table->string('title', 255);
            $table->string('subtitle', 255);
            $table->text('description');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('institucional');
    }
};
