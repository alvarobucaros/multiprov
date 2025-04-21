<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Proveedor;
use Illuminate\Http\Request;
use Illuminate\Http\Response; // Para respuestas HTTP
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProveedorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
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

    public function store(Request $request)
    {
        $request-> validate([
            'prv_sociedad_id' => 'required',
            'prv_nombre' => 'required|max:100',
            'prv_telefono' => 'required|max:20',
            'prv_numero_doc' => 'required|max:20',
            'prv_email' => 'required|max:100',
            'prv_estado' => 'required',
        ]);

        Proveedor::create($request->all());
        return redirect()->back()->with('success', 'Proveedor creado exitosamente.');
    }


    public function update(Request $request, $id)
    {
        $proveedores = Proveedor::find($id);
        $proveedores->fill($request->input())->saveOrFail();
        return redirect()->back()->with('success', 'Proveedor actualizado correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Proveedor $proveedore) // Route Model Binding
    {
         // Cargar la relación empresa
        $proveedore->load('empresa:id,nombre');
        return response()->json($proveedore);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $proveedore = Proveedor::find($id);
        if (!$proveedore) {
            return response()->json(['message' => 'Proveedor no encontrado'], Response::HTTP_NOT_FOUND);
        }
        $proveedore->delete();

         return redirect()->back()->with('success','Proveedor eliminado correctamente');
        
    }

    
}