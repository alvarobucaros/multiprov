 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { useRef, useState, React } from 'react';
import { Head ,useForm, usePage, Link} from '@inertiajs/react';
import MiInput from '@/Components/MiInput';


export default function Empresa(props) {
    const user = usePage().props.auth.user;
    const empresa = props.empresa || {};
    const [operation, setOperation] = useState('1'); 

    if (!empresa) {
        return <p>Cargando...</p>; // Muestra un mensaje de carga mientras `empresa` se carga
    }
    
    const { data, setData } = useForm({
        id: empresa?.id || '', 
        emp_nombre: empresa?.emp_nombre || '',
        emp_direccion: empresa?.emp_direccion || '',
        emp_ciudad: empresa?.emp_ciudad || '',
        emp_tipodoc: empresa?.emp_tipodoc || '',                        
        emp_nrodoc: empresa?.emp_nrodoc || '',
        emp_telefono: empresa?.emp_telefono || '',                         
        emp_email: empresa?.emp_email || '',                         
        emp_logo: empresa?.emp_logo || '',
        emp_fchini: empresa?.emp_fchini || '',                         
        emp_estado: empresa?.emp_estado || '',
    });
    

    const save = (e) =>{
        e.preventDefault();
        data.logo = fileName;
        if(operation === 1){  
            try {
                const response =  Inertia.put(`/parametro/${data.id}`, data);// Inertia.post(`/parametro/empresa.id`, data);
                alert('Datos actualizados exitosamente : '+data.id);
              //  console.log('Respuesta:', response);
            } catch (error) {
                console.error('Error al crear el parametro:', error);
            }
        }
        else{      
            try {
                const response = Inertia.put(`/parametro/${data.id}`, data);
                alert('Datos actualizados exitosamente');
              // console.log('Respuesta:', response);
            } catch (error) {
                console.error('Error al actualizar el parametro:', error);
            }
        }
    }
     
    const eliminar = (id, emp_nombre) =>{
        const alerta = Swal.mixin({ buttonsStyling:true});
            alerta.fire({
            title:'Seguro de eliminar el parametro '+id + ' '+emp_nombre,
            text:'Se perderá el parametro',
            icon:'question', showCancelButton:true,
            confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
            cancelButtonText:'<i class="fa-solid fa-ban"></i>No, Cancelar'
        }).then((result) => {
            if(result.isConfirmed){
                Inertia.delete(`/parametro/${id}`, {
                    onSuccess: () => {
                        alert('parametro eliminado exitosamente.');
                    },
                    onError: (errors) => {
                        console.error('Error al eliminar el parametro:', errors);
                    },
                });
            }
        });
    }

    const [fileName, setFileName] = useState('data.emp_logo'); 

    const handleChangef = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name); // Actualiza el estado con el nombre del archivo
            alert(file.name)
        }
    };
    
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        // Si es un archivo, lo guardas en el estado como un objeto File
        if (name === "emp_logo") {
            setData({ ...data, emp_logo: files[0] });
        } else {
            setData({ ...data, [name]: value });
        }
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}   
        >
         
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
       
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out scale-100">
                <h2 className="p-0 text-lg font-medium text-gray-900">
                    Nuestra Empresa
                </h2>
                <div className="bg-white rounded-lg shadow-xl p-2 w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out scale-100">
                    <form onSubmit={save}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* <div className="md:col-span-2">
                                <label htmlFor="emp_nombre" className="block text-sm font-medium text-gray-700 ">Nombre Empresa </label>
                                <input
                                type="text"
                                id="emp_nombre"
                                name="emp_nombre"
                                value={data.emp_nombre} 
                                onChange={handleChange}
                                maxLength={100}                       
                                className={`w-full px-1 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 'border-gray-300'}`}
                                required
                                />                
                            </div> */}
                          
                        |<MiInput  Id="emp_nombre" Type="text" Label="Nombre Empresa" onChange={handleChange}
                         classNameI="md:col-span-2" maxLength ="100" data ={data.emp_nombre} required={true}></MiInput>
                        
                        <MiInput  Id="emp_direccion" Type="text" Label="Dirección" onChange={handleChange}
                         classNameI="md:col-span-2" maxLength ="100" data ={data.emp_direccion} required={true}></MiInput>
                        {/* <div className="md:col-span-2">
                            <label htmlFor="emp_direccion" className="block text-sm font-medium text-gray-700 ">Dirección</label>
                            <input
                                type="text"
                                id="emp_direccion"
                                name="emp_direccion"
                                value={data.emp_direccion}
                                onChange={handleChange}
                                maxLength={100}                       
                                className={`w-full px-1 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 'border-gray-300'}`}
                                required 
                            />                
                        </div> */}
                        <div>
                            <label htmlFor="emp_ciudad" className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                            <input
                                type="text"
                                id="emp_ciudad"
                                name="emp_ciudad"
                                value={data.emp_ciudad}
                                onChange={handleChange}
                                maxLength={100}                       
                                className={`w-full px-1 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 'border-gray-300'}`}
                                required
                            />                
                        </div>
                        <div>
                            <label htmlFor="emp_telefono" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                            <input
                                type="text"
                                id="emp_telefono"
                                name="emp_telefono"
                                value={data.emp_telefono}
                                onChange={handleChange}
                                maxLength={100}                       
                                className={`w-full px-1 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 'border-gray-300'}`}
                                required
                            />                
                        </div>

                        <div>
                            <label htmlFor="emp_tipodoc" className="block text-sm font-medium text-gray-700 mb-1">Tipo Documento *</label>
                            <select
                                id="emp_tipodoc"
                                name="emp_tipodoc"
                                value={data.emp_tipodoc}
                                onChange={handleChange}
                                className={`w-full px-1 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 'border-gray-300'}`}
                                required
                            >
                                <option value="N">NIT</option>
                                <option value="C">Cédula</option>
                                <option value="E">Extranjería</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="emp_nrodoc" className="block text-sm font-medium text-gray-700 mb-1">Número doc</label>
                            <input
                                type="text"
                                id="emp_nrodoc"
                                name="emp_nrodoc"
                                value={data.emp_nrodoc}
                                onChange={handleChange}
                                maxLength={100}                       
                                className={`w-full px-1 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 'border-gray-300'}`}
                                required
                            />                
                        </div>
                                      
                        <div className="md:col-span-2">
                            <label htmlFor="emp_email" className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
                            <input
                                type="mail"
                                id="emp_email"
                                name="emp_email"
                                value={data.emp_email}
                                onChange={handleChange}
                                maxLength={100}                       
                                className={`w-full px-1 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 'border-gray-300'}`}
                                required
                            />                
                        </div>
                        <div>
                            <label htmlFor="emp_estado" className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                            <select
                                id="emp_estado"
                                name="emp_estado"
                                value={data.emp_estado}
                                onChange={handleChange}
                                className={`w-full px-1 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 'border-gray-300'}`}
                                required
                            >
                                <option value="A">ACTIVO</option>
                                <option value="I">INACTIVO</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="emp_fchini" className="block text-sm font-medium text-gray-700 mb-1">Fecha inicio</label>
                            <input
                                type="date"
                                id="emp_fchini"
                                name="emp_fchini"
                                value={data.emp_fchini}
                                onChange={handleChange}
                                maxLength={100}                       
                                className={`w-full px-1 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 'border-gray-300'}`}
                                required
                            />                
                        </div>
                        <div >
                            <label htmlFor="emp_logo" className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                            <input
                                type="file"
                                id="emp_logo"
                                name="emp_logo"
                                value=''
                                onChange={handleChangef}
                            />
                           
                        </div>
                        <img src={`/logos/${empresa.emp_logo}`} alt="Logo Empresa" className="w-30 h-30" />
                        <div className="border-t flex justify-end space-x-3">
                            <a
                                type="button"   href="/dashboard"                           
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
                            >
                                Al Menú
                            </a>
                            <button
                                type="submit"

                                className="px-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                            >
                                Actualizar                            
                            </button>
                        </div>
                        <div style={{display:'none'}}>
                            <input type="text" id="emp_logo2" name="emp_logo2"
                                value='data.emp_logo' />
                        </div>
                    </div>

                    </form>
                </div>
            </div>
            </div>        
        </AuthenticatedLayout>
    );


}