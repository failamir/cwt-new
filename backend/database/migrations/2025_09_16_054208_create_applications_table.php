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
        Schema::create('applications', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('job_id');
            $table->uuid('user_id');
            $table->enum('status', ['pending', 'shortlisted', 'approved', 'rejected'])->default('pending');
            $table->json('personal_details')->nullable();
            $table->json('pre_screening')->nullable();
            $table->json('screening')->nullable();
            $table->timestamps();

            $table->unique(['job_id', 'user_id']);
            $table->index(['status']);
            $table->index(['job_id']);
            $table->index(['user_id']);

            $table->foreign('job_id')->references('id')->on('jobs')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
