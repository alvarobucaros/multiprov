<?php


use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EjemploController;

use App\Http\Controllers\api\EmpresaController;
use App\Http\Controllers\Api\CotizacionController as ApiCotizacionController;
use App\Http\Controllers\Api\CotizaciondetalleController as ApiCotizaciondetalleController;
use App\Http\Controllers\Api\GrupoController as ApiGrupoController;
use App\Http\Controllers\Api\SubgrupoController as ApiSubgrupoController;
use App\Http\Controllers\Api\ProductoController as ApiProductoController;
use App\Http\Controllers\Api\ProveedorController as ApiProveedorController;
use App\Http\Controllers\Api\ProveedorSubgruController as ApiProveedorSubgruController;
use App\Http\Controllers\Api\ParametroController as ApiParametroController;
use App\Http\Controllers\Api\UserController as ApiUserController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/formulario-ejemplo', [EjemploController::class, 'index'])->name('formulario.ejemplo');

Route::get('/cotizacion', [ApiCotizacionController::class, 'index'])->name('cotizacion');
Route::get('/cotizacion/{id}', [ApiCotizacionController::class, 'show'])->name('cotizacion.show');
Route::post('/cotizacion', [ApiCotizacionController::class, 'store'])->name('cotizacion.store');
Route::put('/cotizacion/{id}', [ApiCotizacionController::class, 'update'])->name('cotizacion.update');
Route::delete('/cotizacion/{id}', [ApiCotizacionController::class, 'destroy'])->name('cotizacion.destroy');

Route::get('/cotizaciondetalle', [ApiCotizaciondetalleController::class, 'index'])->name('cotizaciondetalle');
//Route::get('/cotizaciondetalle/{id}', [ApiCotizaciondetalleController::class, 'show'])->name('cotizaciondetalle.getDetalles');
Route::post('/cotizaciondetalle', [ApiCotizaciondetalleController::class, 'store'])->name('cotizaciondetalle.store');
Route::put('/cotizaciondetalle/{id}', [ApiCotizaciondetalleController::class, 'update'])->name('cotizaciondetalle.update');
Route::delete('/cotizaciondetalle/{id}', [ApiCotizaciondetalleController::class, 'destroy'])->name('cotizaciondetalle.destroy');

Route::get('/cotizaciondetalle/{id}', [ApiCotizaciondetalleController::class, 'getDetalles'])->name('cotizaciondetalle.getDetalles');;

Route::get('/producto', [ApiProductoController::class, 'index'])->name('producto');
Route::get('/producto/{id}', [ApiProductoController::class, 'show'])->name('producto.show');
Route::post('/producto', [ApiProductoController::class, 'store'])->name('producto.store');
Route::put('/producto/{id}', [ApiProductoController::class, 'update'])->name('producto.update');
Route::delete('/producto/{id}', [ApiProductoController::class, 'destroy'])->name('articulo.destroy');


Route::get('/parametro', [ApiParametroController::class, 'index'])->name('parametro');
Route::put('/parametro/{id}', [ApiParametroController::class, 'update'])->name('parametro.store');

Route::get('/proveedor', [ApiProveedorController::class, 'index'])->name('proveedor');
Route::get('/proveedor/{id}', [ApiProveedorController::class, 'show'])->name('proveedor.show');
Route::post('/proveedor', [ApiProveedorController::class, 'store'])->name('proveedor.store');
Route::put('/proveedor/{id}', [ApiProveedorController::class, 'update'])->name('proveedor.update');
Route::delete('/proveedor/{id}', [ApiProveedorController::class, 'destroy'])->name('proveedor.destroy');

Route::get('/proveedorsub/{id}', [ApiProveedorSubgruController::class, 'index'])->name('proveedorsub');
Route::put('/proveedorsub/{id}', [ApiProveedorSubgruController::class, 'update'])->name('proveedorsub.update');
Route::delete('/proveedorsub/{id}', [ApiProveedorSubgruController::class, 'destroy'])->name('proveedorsub.destroy');
Route::post('/proveedorsub', [ApiProveedorSubgruController::class, 'store'])->name('proveedorsub.store');

Route::get('/grupo', [ApiGrupoController::class, 'index'])->name('grupo');
Route::get('/grupo/{id}', [ApiGrupoController::class, 'show'])->name('grupo.show');
Route::post('/grupo', [ApiGrupoController::class, 'store'])->name('grupo.store');
Route::put('/grupo/{id}', [ApiGrupoController::class, 'update'])->name('grupo.update');
Route::delete('/grupo/{id}', [ApiGrupoController::class, 'destroy'])->name('grupo.destroy');

Route::get('/subgrupo', [ApiSubgrupoController::class, 'index'])->name('subgrupo');
Route::get('/subgrupo/{id}', [ApiSubgrupoController::class, 'show'])->name('subgrupo.show');
Route::post('/subgrupo', [ApiSubgrupoController::class, 'store'])->name('subgrupo.store');
Route::put('/subgrupo/{id}', [ApiSubgrupoController::class, 'update'])->name('subgrupo.update');
Route::delete('/subgrupo/{id}', [ApiSubgrupoController::class, 'destroy'])->name('subgrupo.destroy');

Route::get('/user', [ApiUserController::class, 'index'])->name('user');
Route::get('/user/{id}', [ApiUserController::class, 'show'])->name('user.show');
Route::post('/user', [ApiUserController::class, 'store'])->name('user.store');
Route::put('/user/{id}', [ApiUserController::class, 'update'])->name('user.update');
Route::delete('/user/{id}', [ApiUserController::class, 'destroy'])->name('user.destroy');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
