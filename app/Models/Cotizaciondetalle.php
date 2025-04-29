<?php

namespace App\Models;

use App\Models\Cotizacion;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Cotizaciondetalle extends Model
{
    use HasFactory;

    protected $table = 'cotizaciondetalles';

    protected $fillable = ['cds_cotizacion_id', 'cds_producto_id', 'cds_cantidad', 
    'cds_unidadMedida','cds_detalle'];

    public function cotizacion()
    {
        return $this->belongsTo(Cotizacion::class, 'cds_cotizacion_id', 'id');
    }

}
