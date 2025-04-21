<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Empresa extends Model
{
    use HasFactory;

    // Hay muchos usuarios en la empresa
     
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    protected $fillable = [
        'emp_nombre',
        'emp_direccion',
        'emp_ciudad',
        'emp_tipodoc',
        'emp_nrodoc',
        'emp_telefono',
        'emp_email',
        'emp_logo',
        'emp_fchini',
        'emp_nrocotizacion',
        'emp_estado',
    ];

    public function usuarios()
    {
        return $this->hasMany(User::class, 'empresa_id');
    }

    public function grupos()
    {
        return $this->hasMany(Grupo::class, 'grp_sociedad_id');
    }


    public function proveedores()
    {
        return $this->hasMany(Proveedor::class, 'sgr_sociedad_id');
    }
}