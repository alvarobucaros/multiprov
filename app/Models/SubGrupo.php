<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubGrupo extends Model
{
    use HasFactory;

    protected $table = 'subgrupos';

    protected $fillable = ['sgr_empresa_id', 'sgr_grupo_id', 'sgr_titulo',  'sgr_detalle', 'sgr_estado'];

    // Relación: Un subgrupo pertenece a un grupo
    public function grupo()
    {
        return $this->belongsTo(Grupo::class, 'sgr_grupo_id');
    }

    // public function articulos()
    // {
    //     return $this->hasMany(Articulo::class, 'art_subgrupo_id');
    // }
}
