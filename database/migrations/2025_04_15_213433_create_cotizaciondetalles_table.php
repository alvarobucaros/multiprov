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
        Schema::create('cotizaciondetalles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cds_cotizacion_id')->constrained('cotizaciones')->onDelete('cascade');
            $table->integer('cds_producto_id')->constrained('productos')->onDelete('cascade');
            $table->integer('cds_cantidad');
            $table->string('cds_unidadMedida');
            $table->string('cds_detalle');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cotizaciondetalles');
    }
};
