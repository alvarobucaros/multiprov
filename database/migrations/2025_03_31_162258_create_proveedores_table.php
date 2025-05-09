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
        Schema::create('proveedores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('prv_sociedad_id')->constrained('empresas')->onDelete('cascade'); // Clave foránea
            $table->string('prv_nombre',100);
            $table->string('prv_telefono',50);
            $table->enum('prv_tipo_doc', ['N', 'C', 'E', 'P'])->comment('N=NIT, C=Cedula, E=Extranjeria'); // O el significado que le des
            $table->string('prv_numero_doc',100);
            $table->string('prv_email',100);
            $table->tinyInteger('prv_calificacion')->unsigned()->default(5); // 0-9
            $table->string('prv_estado',1);
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proveedores');
    }
};
