<?php

namespace App\Models;

use App\Models\Cotizaciondetalle;
use Cotizaciondetalles;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cotizacion extends Model
{
    use HasFactory;

    protected $table = 'cotizaciones';

    protected $fillable = ['cot_empresa_id', 'cot_numero', 'cot_fecha','cot_titulo',
    'cot_detalle','cot_estado'];

    public function empresa(): BelongsTo
    {
        return $this->belongsTo(Empresa::class, 'cot_sociedad_id');
    }

    // Relación con cotizacionDetalles una cotizacion muchas cotizacionDetalles()
    public function cotizaciondetalle()
    {
        return $this->hasMany(Cotizaciondetalle::class, 'cds_cotizacion_id', 'id');
    }
    
}

