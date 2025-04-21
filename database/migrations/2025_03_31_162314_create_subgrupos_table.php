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
        Schema::create('subgrupos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sgr_empresa_id')->constrained('empresas')->onDelete('cascade'); // Clave foránea
            $table->foreignId('sgr_grupo_id')->constrained('grupos')->onDelete('cascade'); // Clave foránea
            $table->string('sgr_titulo',100);
            $table->string('sgr_detalle',50);
            $table->string('sgr_estado',1);
            $table->timestamps();
        });
    }

    /** 
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subgrupos');
    }
};
