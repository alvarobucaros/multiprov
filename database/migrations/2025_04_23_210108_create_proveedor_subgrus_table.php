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
        Schema::create('proveedorsubgrupos', function (Blueprint $table) {
            $table->id();
            $table->integer('prv_proveedor_id')->constrained('proveedores')->onDelete('cascade'); 
            $table->integer('prv_subgrupo_id')->constrained('subgrupos')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proveedorsubgruposs');
    }
};
