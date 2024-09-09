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
            $table->unsignedBigInteger('theme_id');
            $table->foreign('theme_id')->references('id')->on('theme');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('site_setting', function (Blueprint $table) {
            $table->dropForeign(['theme_id']);
            $table->dropColumn('theme_id');
        });
    }
};
