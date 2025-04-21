<?php

namespace App\Http\Controllers;

use App\Models\Otros;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EjemploController extends Controller
{
    public function index()
    {
        return Inertia::render('Ejemplo'); // Esto carga el componente 'Ejemplo.jsx'
    }

}
