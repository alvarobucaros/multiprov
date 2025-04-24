<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Grupo;
use Illuminate\Http\Request;
use Illuminate\Http\Response; // Para respuestas HTTP 
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GrupoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
       
        $user = Auth::user();
 
       //  Valida que el usuario tenga una empresa asociada
        if (!$user || !$user->empresa_id) {           
            return Inertia::render('Grupos/Index', ['grupos' => []]);
        }
        $grupos = Grupo::where('grp_empresa_id', $user->empresa_id)   
        ->orderBy('grp_titulo')  
        ->paginate(10); 
        return Inertia::render('Grupos/Index', ['grupos' => $grupos]);
  
    }

    public function store(Request $request)
    {  
        $request-> validate([
            'grp_empresa_id' => 'required',
            'grp_titulo' => 'required|max:50',
            'grp_detalle' => 'required|max:200',
        ]);

        Grupo::create($request->all());
        return redirect()->back()->with('success', 'Grupo creado exitosamente.');
    }


    public function update(Request $request, $id)
    {
        $grupos = Grupo::find($id);
        $grupos->fill($request->input())->saveOrFail();
        return redirect()->back()->with('success', 'Grupo actualizado correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Grupo $grupo) // Route Model Binding
    {
         // Cargar la relación empresa
        $grupo->load('empresa:id,nombre');
        return response()->json($grupo);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $grupo = Grupo::find($id);
        if (!$grupo) {
            return response()->json(['message' => 'Proveedor no encontrado'], Response::HTTP_NOT_FOUND);
        }
        $grupo->delete();

         return redirect()->back()->with('success','Grupo eliminado correctamente');
        
    }

    
}