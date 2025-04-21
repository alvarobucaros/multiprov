<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProveedorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Cambiar por lógica de autorización si es necesario
    }

    public function rules(): array
    {
        $proveedorId = $this->route('proveedore'); // Obtiene el ID del proveedor de la ruta
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
                Rule::unique('proveedores')->where(function ($query) use ($empresaId) {
                    return $query->where('prv_empresa_id', $empresaId)
                                 ->where('prv_tipo_doc', $this->input('prv_tipo_doc'));
                })->ignore($proveedorId), // Ignora el registro actual al validar unicidad
            ],
            'prv_email' => [
                'nullable',
                'email',
                'max:100',
                Rule::unique('proveedores', 'prv_email')->ignore($proveedorId), // Ignora el registro actual
            ],
            'prv_calificacion' => 'required|integer|min:0|max:9',
            'prv_estado' => 'required|boolean',
        ];
    }
}