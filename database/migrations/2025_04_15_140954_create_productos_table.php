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
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('prd_empresa_id')->constrained('empresas')->onDelete('cascade'); // Clave foránea
            $table->foreignId('prd_subgrupo_id')->constrained('subgrupos')->onDelete('cascade'); // Clave foránea
            $table->string('prd_titulo',60);
            $table->string('prd_detalle',100);
            $table->string('prd_estado',1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
