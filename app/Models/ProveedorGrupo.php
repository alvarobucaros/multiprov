<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProveedorGrupo extends Model
{
    use HasFactory;

    protected $table = 'proveedor_grupo';

    protected $fillable = ['prg_proveedor_id', 'prv_grupo_id'];
}
