<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cotizaciondetalle;
use App\Models\Cotizacion;
use App\Models\Proveedor;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Http\Response; //  Para respuestas HTTP
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
        $user = Auth::user();
        if (!$user || !$user->empresa_id) {           
            return Inertia::render('Productos/Index', ['productos' => []]);
        }

        // Recuperar los registros filtrados por cds_cotizacion_id
        $cotizaciondetalle = Cotizaciondetalle::where('cds_cotizacion_id', $id)
        ->join('productos', 'cotizaciondetalles.cds_producto_id', '=', 'productos.id')
            ->select('cotizaciondetalles.id', 'cds_cotizacion_id', 'cds_producto_id', 'prd_titulo',
            'cds_cantidad', 'cds_unidadMedida', 'cds_detalle')
            ->get();

        $productos = Producto::where('prd_empresa_id', $user->empresa_id) 
        ->select('id','prd_titulo')  
        ->orderBy('prd_titulo')->get();

        $cotizacion = Cotizacion::where('id', $id)
        ->select( 'id', 'cot_numero',  'cot_fecha',  'cot_titulo', 'cot_detalle')
        ->get();

        return Inertia::render('CotizacionesDetalle/Index', [
            'cotizaciondetalle' => $cotizaciondetalle,
            'cotizacion' => $cotizacion, 
            'productos' => $productos,             
        ]);
    }

     
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {  
        $request-> validate([
            'cds_cotizacion_id'=> 'required',
            'cds_producto_id' => 'required',
            'cds_cantidad' => 'required',
            'cds_unidadMedida' => 'required',
            'cds_detalle' => 'required|max:200',

        ]);

        Cotizaciondetalle::create($request->all());
        return redirect()->back()->with('success', 'Cotizaciondetalle creada exitosamente.');
    }

    //, cds_cotizacion_id,cds_producto_id, cds_cantidad, cds_unidadMedida, cds_detalle,

    public function update(Request $request, $id)
    {
        $request-> validate([
            'cds_cotizacion_id'=> 'required',
            'cds_producto_id' => 'required',
            'cds_cantidad' => 'required',
            'cds_unidadMedida' => 'required',
            'cds_detalle' => 'required|max:200',

        ]);
        $cotizaciondet = Cotizaciondetalle::find($id);
        if (!$cotizaciondet) {
            return response()->json(['message' => 'Cotizaciondetalle no encontrada'], Response::HTTP_NOT_FOUND);
        }
        $cotizaciondet->fill($request->input())->saveOrFail();
        return redirect()->back()->with('success', 'Cotizaciondetalle actualizada correctamente');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $cotizacion = Cotizaciondetalle::find($id);
        if (!$cotizacion) {
            return response()->json(['message' => 'Cotizaciondetalle no encontrada'], Response::HTTP_NOT_FOUND);
        }
        $cotizacion->delete();

         return redirect()->back()->with('success','Cotizaciondetalle eliminada correctamente');
        
    }

    
}