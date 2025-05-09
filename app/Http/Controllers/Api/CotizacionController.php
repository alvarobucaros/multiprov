<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cotizacion;
use Illuminate\Http\Request;
use Illuminate\Http\Response; // Para respuestas HTTP
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CotizacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $cotizaciones = Cotizacion::where('cot_empresa_id', $user->empresa_id) 
        ->join('empresas', 'cotizaciones.cot_empresa_id', '=', 'empresas.id')
        ->select('empresas.emp_nrocotizacion as cotizaciones.emp_nrocotizacion', 'cotizaciones.cot_numero',
         'cotizaciones.cot_fecha', 'cotizaciones.cot_titulo','cotizaciones.cot_detalle', 
         'cotizaciones.cot_estado','cotizaciones.id' )  
        ->orderBy('cotizaciones.cot_numero', 'DESC')  
        ->paginate(10);   

        return Inertia::render('Cotizaciones/Index', [
            'cotizaciones' => $cotizaciones,
        ]);
    }


    public function imprime($id)
    {
        $cotizaciones = Cotizacion::where('cotizaciones.id', $id)
        ->join('empresas', 'cotizaciones.cot_empresa_id', '=', 'empresas.id')
        ->get();

        return Inertia::render('Cotizaciones/Imprime', ['cotizaciones' => $cotizaciones]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {  
        $request-> validate([
            'cot_titulo'=> 'required',
            'cot_empresa_id' => 'required',
            'cot_numero' => 'required',
            'cot_fecha' => 'required',
            'cot_detalle' => 'required|max:200',

        ]);

        Cotizacion::create($request->all());
        return redirect()->back()->with('success', 'Cotizacion creada exitosamente.');
    }

 

    public function update(Request $request, $id)
    {
        $cotizacion = Cotizacion::find($id);
        $cotizacion->fill($request->input())->saveOrFail();
        return redirect()->back()->with('success', 'Cotizacion actualizada correctamente');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $cotizacion = Cotizacion::find($id);
        if (!$cotizacion) {
            return response()->json(['message' => 'Cotizacion no encontrada'], Response::HTTP_NOT_FOUND);
        }
        $cotizacion->delete();

         return redirect()->back()->with('success','Cotizacion eliminada correctamente');
        
    }

    
}