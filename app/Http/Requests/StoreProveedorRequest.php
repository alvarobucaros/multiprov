<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProveedorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Cambiar por lógica de autorización si es necesario
    }

    public function rules(): array
    {
        // Obtener empresa_id para la regla unique compuesta
        $empresaId = $this->input('prv_empresa_id');

        return [
            'prv_empresa_id' => 'required|exists:empresas,id',
            'prv_nombre' => 'required|string|max:100',
            'prv_telefono' => 'nullable|string|max:20',
            'prv_tipo_doc' => ['required', Rule::in(['N', 'C', 'E'])],
            'prv_numero_doc' => [
                'required',
                'string',
                'max:20',
                 // Regla unique compuesta: el par tipo+numero debe ser único para esa empresa
                Rule::unique('proveedores')->where(function ($query) use ($empresaId) {
                     return $query->where('prv_empresa_id', $empresaId)
                                  ->where('prv_tipo_doc', $this->input('prv_tipo_doc'));
                 }),
            ],
            'prv_email' => 'nullable|email|max:100|unique:proveedores,prv_email',
            'prv_calificacion' => 'required|integer|min:0|max:9',
            'prv_estado' => 'required|boolean',
        ];
    }
}