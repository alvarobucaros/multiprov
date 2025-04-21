<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response; // Para respuestas HTTP
use Inertia\Inertia;

class UserController extends Controller
{

        /**
     * Update the user's password.
     */
    // public function update2(Request $request): RedirectResponse
    // {
    //     $validated = $request->validate([
    //         'current_password' => ['required', 'current_password'],
    //         'password' => ['required', Password::defaults(), 'confirmed'],
    //     ]);

    //     $request->user()->update2([
    //         'password' => Hash::make($validated['password']),
    //     ]);

    //     return back();
    // }
    /**
     * Display a listing of the resource. 
     */
    public function index(Request $request)
    {
        // Obtener usuarios paginados   

        $users = User::orderBy("grp_titulo")
        ->orderBy('name', 'asc') // Opcional: ordenar
        ->paginate(10);
        return Inertia::render('Users/Index',['users'=>$users]); 
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {  
        $request-> validate([
            'empresa_id' => 'required',
            'name' => 'required|max:100',
            'email' => 'required|max:100',
            'password' => 'required|max:100',
            'role' => 'required|max:5',

        ]);

        User::create($request->all());
        return redirect()->back()->with('success', 'Unsuario creado exitosamente.');
    }


    public function update(Request $request, $id)
    {
        $user = User::find($id);
        $user->fill($request->input())->saveOrFail();
        return redirect()->back()->with('success', 'Usuario actualizado correctamente');
    }

    /**
     * Display the specified resource.
     */

    public function show(User $user) // Route Model Binding
    {
         // Cargar la relación empresa
        $user->load('empresa:id,nombre');
        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Proveedor no encontrado'], Response::HTTP_NOT_FOUND);
        }
        $user->delete();

         return redirect()->back()->with('success','Usuario eliminado correctamente');
        
    }

}
