<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Empresa; 
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class ParametroController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $empresa =  Empresa::find($user->empresa_id);
        if (!$empresa) {
            return Inertia::render('Empresas/Index', ['empresa' => null]);
        }
        return Inertia::render('Empresas/Index', ['empresa' => $empresa]);
    }

    public function store(Request $request, $id)
{
    $request->validate([
        'emp_nombre' => 'required|string|max:255',
        'emp_direccion' => 'required|string|max:255',
        'emp_ciudad' => 'required|string|max:255',
        'emp_logo' => 'nullable|file|mimes:jpg,jpeg,png|max:2048', // Valida el archivo
    ]);

    $empresa = Empresa::findOrFail($id);

    // Si se envía un archivo, guárdalo en la carpeta public/logos
    if ($request->hasFile('emp_logo')) {
        $logoPath = $request->file('emp_logo')->store('logos', 'public');
        $empresa->emp_logo = $logoPath; // Guarda la ruta relativa en la base de datos
    }

    $empresa->emp_nombre = $request->emp_nombre;
    $empresa->save();

    return redirect()->back()->with('success', 'Empresa actualizada exitosamente');
}


 

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'emp_nombre' => 'required|string|max:255',
            'emp_direccion' => 'required|string',
            // Agregar otras validaciones
        ]);
    
        $empresa = Empresa::findOrFail($id);
        $empresa->update($validatedData);
    
        return response()->json(['message' => 'Registro actualizado correctamente']);
    }   




}