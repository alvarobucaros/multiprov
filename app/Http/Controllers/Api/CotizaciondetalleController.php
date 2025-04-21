<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cotizaciondetalle;
use App\Models\Cotizacion;
use App\Models\Proveedor;
use Illuminate\Http\Request;
use Illuminate\Http\Response; // Para respuestas HTTP
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CotizaciondetalleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
 
        //  Valida que el usuario tenga una empresa asociada
         if (!$user || !$user->empresa_id) {           
             return Inertia::render('Proveedores/Index', ['proveedores' => []]);
         }
   
        $proveedores = Proveedor::where('prv_sociedad_id', $user->empresa_id)   
        ->orderBy('prv_nombre')  // 2. Ordena los resultados por 'grp_titulo'.
        ->paginate(10);   // 3. Pagina los resultados.
        
        return Inertia::render('Proveedores/Index',['proveedores'=>$proveedores]);  
    }
    public function getDetalles($id)
    {
        // Recuperar los registros filtrados por cds_cotizacion_id
        $cotizaciondetalle = Cotizaciondetalle::where('cds_cotizacion_id', $id)
        ->join('productos', 'cotizaciondetalles.cds_producto_id', '=', 'productos.id')
            ->select('cotizaciondetalles.id', 'cds_cotizacion_id', 'cds_producto_id', 'prd_titulo',
            'cds_cantidad', 'cds_unidadMedida', 'cds_detalle')
            ->get();

        $cotizacion = Cotizacion::where('id', $id)
        ->select( 'cot_numero',  'cot_fecha',  'cot_titulo', 'cot_detalle')
        ->get();
            return Inertia::render('CotizacionesDetalle/Index', [
                'Cotizaciondetalle' => $cotizaciondetalle,
                'cotizacion' => $cotizacion,                
            ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Cotizaciondetalle $cotizaciondetalles)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cotizaciondetalle $cotizaciondetalles)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cotizaciondetalle $cotizaciondetalles)
    {
        //
    }
}
