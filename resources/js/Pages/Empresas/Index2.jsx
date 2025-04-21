import React, { useState, useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // O tu layout base

//  Asumiendo que tienes componentes InputLabel, TextInput, PrimaryButton, InputError
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

// Para el componente de Edición (Edit.jsx)
export default function Edit({ auth, empresa }) { // Recibe 'empresa' como prop
    const [logoPreview, setLogoPreview] = useState(null);

    const { data, setData, post, processing, errors, reset, progress } = useForm({
        emp_nombre: empresa.emp_nombre || '',
        emp_logo: null, // Importante: inicializar el archivo como null
        // Si usaras PUT/PATCH necesitarías esto:
        // _method: 'PUT',
    });

     // Efecto para mostrar la vista previa del logo seleccionado
    useEffect(() => {
        if (data.emp_logo) {
            const newPreview = URL.createObjectURL(data.emp_logo);
            setLogoPreview(newPreview);

            // Limpieza para revocar el Object URL cuando el componente se desmonte o el archivo cambie
            return () => URL.revokeObjectURL(newPreview);
        } else {
            setLogoPreview(null); // Limpiar vista previa si se quita el archivo
        }
    }, [data.emp_logo]); // Ejecutar solo cuando data.emp_logo cambie

    const submit = (e) => {
        e.preventDefault();
        // Usamos post() y la ruta con nombre para actualizar
        // Inertia manejará el envío como multipart/form-data automáticamente
        // debido a que data.emp_logo contiene un objeto File.
        // Pasamos el ID de la empresa en la ruta.
        post(route('empresas.update', empresa.id), {
             // Opcional: Resetea el input de archivo si la subida fue exitosa
            // onSuccess: () => reset('emp_logo'),
            // preserveScroll: true, // Para no ir al inicio de la página tras la petición
        });
    };

    return (
        // Asumiendo que usas un Layout
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Empresa: {empresa.emp_nombre}</h2>}
        >
            <Head title="Editar Empresa" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={submit}>
                                {/* Nombre Empresa */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="emp_nombre" value="Nombre Empresa" />
                                    <TextInput
                                        id="emp_nombre"
                                        name="emp_nombre"
                                        value={data.emp_nombre}
                                        className="mt-1 block w-full"
                                        autoComplete="emp_nombre"
                                        isFocused={true}
                                        onChange={(e) => setData('emp_nombre', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.emp_nombre} className="mt-2" />
                                </div>

                                {/* Input Logo */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="emp_logo" value="Logo Empresa (Opcional)" />

                                    {/* Mostrar logo actual si existe Y no hay vista previa de nuevo logo */}
                                    {empresa.emp_logo_url && !logoPreview && (
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-600">Logo Actual:</p>
                                            <img src={empresa.emp_logo_url} alt="Logo Actual" className="h-20 w-auto mt-1"/>
                                        </div>
                                    )}

                                    {/* Mostrar vista previa del nuevo logo si se seleccionó uno */}
                                    {logoPreview && (
                                         <div className="mt-2">
                                            <p className="text-sm text-gray-600">Nuevo Logo (Vista Previa):</p>
                                            <img src={logoPreview} alt="Vista previa" className="h-20 w-auto mt-1"/>
                                        </div>
                                    )}

                                    <input
                                        id="emp_logo"
                                        name="emp_logo"
                                        type="file"
                                        className="mt-1 block w-full text-sm text-slate-500
                                          file:mr-4 file:py-2 file:px-4
                                          file:rounded-full file:border-0
                                          file:text-sm file:font-semibold
                                          file:bg-violet-50 file:text-violet-700
                                          hover:file:bg-violet-100"
                                        accept="image/*" // Aceptar solo imágenes
                                        // MUY IMPORTANTE: Usar onInput o cambiar cómo se maneja onChange
                                        // para obtener el archivo correcto. e.target.files[0]
                                        onChange={(e) => setData('emp_logo', e.target.files[0])}
                                    />
                                     {/* Opcional: Barra de progreso */}
                                    {progress && (
                                        <progress value={progress.percentage} max="100" className="w-full mt-2">
                                            {progress.percentage}%
                                        </progress>
                                    )}
                                    <InputError message={errors.emp_logo} className="mt-2" />
                                    <p className="mt-1 text-xs text-gray-500">Dejar vacío para conservar el logo actual.</p>
                                </div>


                                {/* Botones */}
                                <div className="flex items-center justify-end mt-6">
                                    <Link
                                        href={route('empresas.index')}
                                        className="underline text-sm text-gray-600 hover:text-gray-900 mr-4"
                                        disabled={processing}>
                                        Cancelar
                                    </Link>
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        {processing ? 'Guardando...' : 'Guardar Cambios'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// El componente Create.jsx sería muy similar, pero:
// - No recibiría la prop 'empresa'.
// - El useForm inicializaría 'emp_nombre' como ''.
// - El submit llamaría a route('empresas.store') sin ID.
// - No habría sección de "Logo Actual".