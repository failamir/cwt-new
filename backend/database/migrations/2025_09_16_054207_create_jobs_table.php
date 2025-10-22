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
        Schema::create('jobs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->enum('department', ['deck', 'hotel', 'engine']);
            $table->string('company');
            $table->string('location');
            $table->boolean('urgent')->default(false);
            $table->date('date_posted');
            $table->date('expiration_date');
            $table->string('experience', 100);
            $table->enum('gender', ['any', 'male', 'female'])->default('any');
            $table->json('requirements'); // store array of strings
            $table->string('salary')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();

            $table->index(['department']);
            $table->index(['urgent']);
            $table->index(['expiration_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
