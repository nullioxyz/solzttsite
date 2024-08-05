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
        Schema::create('contact', function (Blueprint $table) {
            $table->id();
            
            $table->unsignedBigInteger('content_type_id');
            $table->foreign('content_type_id')->references('id')->on('content_type');

            $table->string('firstname', 45);
            $table->string('lastname', 45);
            $table->string('email', 45);
            $table->string('phone', 45);
            $table->string('contact_me_by', 45);
            $table->text('tattoo_idea');
            $table->text('references');
            $table->string('size');
            $table->string('body_location');
            $table->string('gender');
            $table->string('city');
            $table->text('availability');
            $table->tinyInteger('read')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact');
    }
};
