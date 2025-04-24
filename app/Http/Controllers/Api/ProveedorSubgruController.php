<?php

namespace App\Http\Controllers\Api;

use App\Models\ProveedorSubgru;

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
 
            $provsubgrupos = ProveedorSubgru::where('prv_proveedor_id', $proveedor_id)  
            ->join('subgrupos', 'prv_subgrupo_id', '=', 'subgrupos.id')
            ->select('proveedorsubgrupos.id', 'proveedorsubgrupos.prv_proveedor_id', 
            'proveedorsubgrupos.prv_subgrupo_id', 'subgrupos.sgr_titulo as grp_titulo') 
            ->orderBy('grp_titulo') 
            ->paginate(10);        
//dd($provsubgrupos);
            return Inertia::render('ProvedorSubgrupos/Index', ['provsubgrupos' => $provsubgrupos]);
            

    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
    public function show(ProveedorSubgru $proveedorSubgru)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProveedorSubgru $proveedorSubgru)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProveedorSubgru $proveedorSubgru)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProveedorSubgru $proveedorSubgru)
    {
        //
    }
}
