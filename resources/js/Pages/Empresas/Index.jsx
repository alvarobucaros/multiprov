 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { useRef, useState, React } from 'react';
import { Head ,useForm, usePage, Link} from '@inertiajs/react';
import MiInput from '@/Components/MiInput';
import MiLista from '@/Components/MiLista';

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
    
    const tipoDocOptions = [
        { value: '', label: '-- Seleccione una opción --' }, // O pción por defecto/placeholder
        { value: 'N', label: 'Nit' },
        { value: 'C', label: 'Cédula Ciudadanía' },
        { value: 'E', label: 'Cédula Extranjería' },
    ];

    const estadoOptions = [
        { value: '', label: '-- Selecciona un estado --' }, // O pción por defecto/placeholder
        { value: 'A', label: 'Activo' },
        { value: 'I', label: 'Inactivo' },
    ];

    const save = (e) =>{
        e.preventDefault();
        data.logo = fileName;
        if(operation === 1){  
            try {
                const response = Inertia.post(`/parametro`, data);
                alert('Datos actualizados exitosamente : '+data.id);
            } catch (error) {
                console.error('Error al crear la empresa:', error);
            }
        }
        else{      
            try {
                 const response = Inertia.put(`/parametro/${data.id}`, data);
                alert('Datos actualizados exitosamente');
              // console.log('Respuesta:', response);
            } catch (error) {
                console.error('Error al actualizar la empresa:', error);
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
                <h2 className="p-0 text-lg font-medium text-gray-900">Nuestra Empresa</h2>
                <div className="bg-white rounded-lg shadow-xl p-2 w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out scale-100">
                    <form onSubmit={save}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          
                        <MiInput  Id="emp_nombre" Type="text" Label="Nombre Empresa" onChange={handleChange}
                         classNameI="md:col-span-2" maxLength ="100" data ={data.emp_nombre} required={true}></MiInput>
                        
                        <MiInput  Id="emp_direccion" Type="text" Label="Dirección" onChange={handleChange}
                         classNameI="md:col-span-2" maxLength ="100" data ={data.emp_direccion} required={true}></MiInput>

                        <MiInput  Id="emp_ciudad" Type="text" Label="Ciudad" onChange={handleChange}
                         classNameI="" maxLength ="50" data ={data.emp_ciudad} required={true}></MiInput> 

                        <MiInput  Id="emp_telefono" Type="text" Label="Teléfono" onChange={handleChange}
                         classNameI="" maxLength ="50" data ={data.emp_telefono} required={true}></MiInput> 

                        <MiLista Id="emp_tipodoc"  Label="Tipo Documento"  data ={data.emp_tipodoc} 
                        options = {tipoDocOptions} OnChange={handleChange} required={true}></MiLista>

                        <MiInput  Id="emp_nrodoc" Type="text" Label="Número Documento" onChange={handleChange}
                         classNameI="" maxLength ="50" data ={data.emp_nrodoc} required={true}></MiInput> 

                        <MiInput  Id="emp_email" Type="email" Label="Correo" onChange={handleChange}
                         classNameI="md:col-span-2" maxLength ="100" data ={data.emp_email} required={true}></MiInput>

                        <MiLista Id="emp_estado"  Label="Estado"  data ={data.emp_estado} 
                        options = {estadoOptions} OnChange={handleChange} required={true}></MiLista>

                        <MiInput  Id="emp_fchini" Type="date" Label="Fecha Inicio" onChange={handleChange}
                         classNameI="" maxLength ="50" data ={data.emp_fchini} required={true}></MiInput> 


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