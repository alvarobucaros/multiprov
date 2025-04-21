<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Producto extends Model
{
    use HasFactory;

    protected $table = 'productos';

    protected $fillable = ['prd_empresa_id',
    'prd_subgrupo_id', 'prd_titulo', 'prd_detalle', 'prd_estado'];

     // Relación con Empresa una empresa muchos productos
     public function empresa(): BelongsTo
     {
         return $this->belongsTo(Empresa::class, 'grp_empresa_id');
     }

}
