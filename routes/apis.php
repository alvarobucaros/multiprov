<?php

use App\Http\Controllers\api\EmpresaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProveedorController; // Importar el controlador
use App\Http\Controllers\api\EmpresaController as ApiEmpresaController;

Route::middleware(['auth:sanctum'])->get('/empresa/{id}', [EmpresaController::class, 'show'])->name('empresa.show');


    // Ruta adicional para obtener la lista de empresas
     Route::get('/empresa/{id}', [EmpresaController::class, 'index'])->name('empresa.index');
    // Route::get('/empresa', [ApiEmpresaController::class, 'index'])->name('empresa.index');
    // Route::get('/empresa/{id}', [ApiEmpresaController::class, 'show'])->name('empresa.show');
// }); // 