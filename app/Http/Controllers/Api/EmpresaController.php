<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Empresa;
use Illuminate\Http\Request;

class EmpresaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $empresa = Empresa::find($id);
        if ($empresa) {
            return response()->json($empresa, 200);
        } else {
            return response()->json(['message' => 'Empresa not found'], 404);
        }
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
    public function show($id)
    {
        $empresa = Empresa::find($id);
        if ($empresa) {
            return response()->json($empresa, 200);
        } else {
            return response()->json(['message' => 'Empresa not found'], 404);
        }
    }
    
    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Empresa $empresa)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Empresa $empresa)
    {
        //
    }
}
