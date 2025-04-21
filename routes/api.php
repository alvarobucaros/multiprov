<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProveedorController; // Importar el controlador

// Rutas para autenticación (si usas Sanctum/Passport)
// Route::post('/login', [AuthController::class, 'login']);
// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/logout', [AuthController::class, 'logout']);
//     Route::get('/user', function (Request $request) {
//         return $request->user();
//     });

    // Rutas CRUD para Proveedores (dentro o fuera del middleware de autenticación según necesidad)
   // Route::apiResource('proveedor', ProveedorController::class);

    // Ruta adicional para obtener la lista de empresas
    Route::get('/empresas-list', [ProveedorController::class, 'getEmpresasList']);

// }); // Fin del grupo de rutas autenticadas