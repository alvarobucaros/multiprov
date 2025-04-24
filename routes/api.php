<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\EmpresaController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Route::get('/empresa/{id}', [EmpresaController::class, 'index'])->name('empresa.index');
Route::get('/empresa/{id}', [EmpresaController::class, 'show'])->name('empresa.show');
