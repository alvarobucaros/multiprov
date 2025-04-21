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
        Schema::create('cotizaciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cot_empresa_id')->constrained('empresas')->onDelete('cascade'); // Clave foránea
            $table->integer('cot_numero');
            $table->date('cot_fecha');
            $table->string('cot_detalle');
            $table->enum('cot_estado', ['I', 'C', 'P'])
            ->comment('I=Iniciada, C=Cerrada, P=En proceso'); 
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cotizaciones');
    }
};
