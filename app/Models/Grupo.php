<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Grupo extends Model
{
    use HasFactory;

    protected $table = 'grupos';
    protected $fillable = ['grp_empresa_id', 'grp_titulo', 'grp_detalle', 'grp_estado'];

     // Relación con Empresa una empresa muchos grupos
     public function empresa(): BelongsTo
     {
         return $this->belongsTo(Empresa::class, 'grp_empresa_id');
     }
      // Relación con Subgrupo un grupo muchos subgrupos
     public function subgrupos()
     {
        return $this->hasMany(SubGrupo::class, 'sgr_grupo_id');
     }

}
