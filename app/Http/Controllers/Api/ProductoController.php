<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Producto;
use App\Models\SubGrupo;
use Illuminate\Http\Request;
use Illuminate\Http\Response; // Para respuestas HTTP 
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        if (!$user || !$user->empresa_id) {           
            return Inertia::render('Productos/Index', ['productos' => []]);
        }

        $productos = Producto::where('prd_empresa_id', $user->empresa_id) 
        ->join('subgrupos', 'productos.prd_subgrupo_id', '=', 'subgrupos.id')
        ->select('subgrupos.id', 'subgrupos.sgr_titulo','productos.id','prd_empresa_id','productos.prd_subgrupo_id',
        'productos.prd_titulo', 'productos.prd_detalle', 'productos.prd_estado')  
        ->orderBy('prd_titulo')  
        ->paginate(10); 

        $subgrupos = SubGrupo::where('sgr_empresa_id', $user->empresa_id)
        ->select('id', 'sgr_titulo as opcion')
        ->orderBy('sgr_titulo')
        ->get();
  
        return Inertia::render('Productos/Index', [
            'subgrupos' => $subgrupos,
            'productos' => $productos,
        ]);
    }

    public function store(Request $request)
    {  
        $request-> validate([
            'prd_empresa_id' => 'required',
            'prd_subgrupo_id' => 'required',
            'prd_titulo' => 'required|max:50',
            'prd_detalle' => 'required|max:200',
            'prd_estado' => 'required',
        ]);

        Producto::create($request->all());
        return redirect()->back()->with('success', 'Producto creado exitosamente.');
    }


    public function update(Request $request, $id)
    {
    
        $producto = Producto::find($id);
        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], Response::HTTP_NOT_FOUND);
        }
        $producto->fill($request->input())->saveOrFail();
        return redirect()->back()->with('success', 'producto actualizado correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $producto = Producto::find($id);
        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], Response::HTTP_NOT_FOUND);
        }
        $producto->delete();

         return redirect()->back()->with('success','Producto eliminado correctamente');
        
    }

}
