<?php

namespace App\Http\Controllers\Api;

use App\Models\ProveedorSubgru;
use App\Models\Proveedor;
use App\Models\Subgrupo;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Http\Response; // Para respuestas HTTP
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProveedorSubgruController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($proveedor_id)
    {
        $user = Auth::user();

        $subgrupos = Subgrupo::where('sgr_empresa_id', $user->empresa_id) 
        ->select('id', 'sgr_titulo')  
        ->orderBy('sgr_titulo')  
        ->get();

        $proveedor = Proveedor::find($proveedor_id);
        if (!$proveedor) {
            $proveedor = [];
        }

        $provsubgrupos = ProveedorSubgru::where('prv_proveedor_id', $proveedor_id)  
        ->join('subgrupos', 'prv_subgrupo_id', '=', 'subgrupos.id')
        ->select('proveedorsubgrupos.id', 'proveedorsubgrupos.prv_proveedor_id', 
        'proveedorsubgrupos.prv_subgrupo_id', 'subgrupos.sgr_titulo as grp_titulo') 
        ->orderBy('grp_titulo') 
        ->paginate(10);        

        return Inertia::render('ProvedorSubgrupos/Index', ['provsubgrupos' => $provsubgrupos,
        'proveedor' => $proveedor, 'subgrupos' => $subgrupos,]);
            
    }


    /**
     * Store a newly created resource in storage. , 
     */
    public function store(Request $request)
    {
        $request-> validate([
            'prv_proveedor_id' => 'required',
            'prv_subgrupo_id' => 'required',
        ]);

        ProveedorSubgru::create($request->all());
        return redirect()->back()->with('success', 'Subgrupo creado exitosamente.');
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $proveedorSubgru = ProveedorSubgru::find($id);
        $proveedorSubgru->fill($request->input())->saveOrFail();
        return redirect()->back()->with('success', 'Subgrupo actualizado correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        {
            $proveedorSubgru = ProveedorSubgru::find($id);
            if (!$proveedorSubgru) {
                return response()->json(['message' => 'Subgrupo no encontrado'], Response::HTTP_NOT_FOUND);
            }
            $proveedorSubgru->delete();
    
             return redirect()->back()->with('success','Subgrupo eliminado correctamente');
        }
    }
}