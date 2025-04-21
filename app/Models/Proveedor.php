<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Proveedor extends Model
{
    use HasFactory;

    protected $table = 'proveedores';

    protected $fillable = [
        'prv_sociedad_id', 
        'prv_nombre', 
        'prv_telefono', 
        'prv_tipo_doc', 
        'prv_numero_doc', 
        'prv_email', 
        'prv_calificacion', 
        'prv_estado'
    ];
    // protected $casts = [
    //     'prv_estado' => '',
    //     'prv_calificacion' => 'integer',

    // ];

    // Relación con Empresa (Asegúrate de tener el modelo Empresa)
    public function empresa(): BelongsTo
    {
        // Asegúrate de que App\Models\Empresa existe
        // y que la llave foránea es 'prv_empresa_id'
        // y la llave local en 'empresas' es 'id'
        return $this->belongsTo(Empresa::class, 'prv_empresa_id');
    }
}
