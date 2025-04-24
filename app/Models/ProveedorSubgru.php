<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProveedorSubgru extends Model
{
    protected $table = 'proveedorsubgrupos';

    protected $fillable = [
        'prs_proveedor_id', 
        'prs_subgrupo_id', 
    ];
}
