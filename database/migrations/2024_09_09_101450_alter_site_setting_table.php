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
        Schema::table('site_setting', function (Blueprint $table) {
            
            $table->dropForeign(['language_id']);
            $table->dropColumn('language_id');
            $table->dropColumn('title');
            $table->dropColumn('description');
            $table->dropColumn('dark_mode');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('site_setting', function (Blueprint $table) {
            
            $table->unsignedBigInteger('language_id');
            $table->foreign('language_id')->references('id')->on('language');
            
            $table->string('title', 100);
            $table->text('description')->nullable();
            $table->boolean('dark_mode')->default(0);
        });
    }
};
