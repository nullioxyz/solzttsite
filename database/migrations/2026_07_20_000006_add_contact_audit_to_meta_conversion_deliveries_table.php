<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('meta_conversion_deliveries', function (Blueprint $table) {
            $table->unsignedBigInteger('contact_id')->nullable()->unique()->after('id');
            $table->string('skip_reason', 80)->nullable()->after('status');
            $table->timestamp('queued_at')->nullable()->after('last_error');
        });
    }

    public function down(): void
    {
        Schema::table('meta_conversion_deliveries', function (Blueprint $table) {
            $table->dropUnique(['contact_id']);
            $table->dropColumn(['contact_id', 'skip_reason', 'queued_at']);
        });
    }
};
