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
    Schema::create('projects', function (Blueprint $table) {
        $table->id();
        $table->string('slug')->unique();
        $table->string('category'); // web_development, graphic_design, photography, videography
        $table->string('status'); // completed, in_progress
        $table->json('title'); // translatable JSON: {"en": "...", "zh": "...", "id": "..."}
        $table->json('description'); // translatable JSON
        $table->json('tech_stack')->nullable(); // array / json untuk teknologi yang digunakan
        $table->boolean('featured')->default(false);
        $table->integer('sort_order')->default(0);
        $table->string('external_url')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
