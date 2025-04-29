<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProveedorSubgru extends Model
{
    protected $table = 'proveedorsubgrupos';

    protected $fillable = [
        'prv_proveedor_id', 
        'prv_subgrupo_id', 
    ];
}
