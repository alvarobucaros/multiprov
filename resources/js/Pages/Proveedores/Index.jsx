import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import Modal from '@/Components/Modal';
import {useState, React } from 'react';
import {useForm, usePage, Link} from '@inertiajs/react';
import Swal from 'sweetalert2';
import Pagination from '@/Components//Pagination';
import MiInput from '@/Components/MiInput';
import MiLista from '@/Components/MiLista';
 
export default function Proveedor(props) {
    const user = usePage().props.auth.user;
    const [modal,setModal] = useState(false);
    const [title,setTitle] = useState('');
    const [operation,setOperation] = useState(1);

    const { data,setData,delete:destroy,post,put,
    processing,reset,errors} = useForm({
        id:'',
        prv_sociedad_id:user.empresa_id,
        prv_nombre:'',
        prv_telefono:'',
        prv_tipo_doc:'',
        prv_numero_doc:'',
        prv_email:'',
        prv_calificacion:'9',
        prv_estado:'',       
    });

    const [role, setRole] = useState(user.role) 
    
    const openModal = (op) =>{
        setModal(true);
        setOperation(op);
        if(op === 1){
            setTitle('Añadir proveedor');
            setData({prv_sociedad_id:user.empresa_id, prv_nombre:'', prv_telefono:'', prv_tipo_doc:'N',
                prv_numero_doc:'', prv_email:'', prv_calificacion:'9', prv_estado:'A'});
        }
        else{
            setTitle('Modificar proveedor');
        }
    }

    const closeModal = () =>{
        setModal(false);
    }

    const estadoOptions = [
        { value: '', label: '-- Selecciona un estado --' }, // Opción por defecto/placeholder
        { value: 'A', label: 'Activo' },
        { value: 'I', label: 'Inactivo' },
    ];

    const tipoDocOptions = [
        { value: '', label: '-- Selecciona un tipo --' }, // Opción por defecto/placeholder
        { value: 'C', label: 'Cédula' },
        { value: 'N', label: 'Nit' },
        { value: 'E', label: 'Cédula Extranjero' },
        { value: 'P', label: 'Pasaporte' },
    ];
    const save = (e) =>{
        e.preventDefault();
        if(operation === 1){  
            try {
                const response = Inertia.post(`/proveedor`, data);
                alert('Datos grabados exitosamente');
                console.log('Respuesta:', response);
            } catch (error) {
                console.error('Error al crear el proveedor:', error);
            }
        }
        else{      
            try {
                const response = Inertia.put(`/proveedor/${data.id}`, data);
                alert('Datos actualizados exitosamente');
                console.log('Respuesta:', response);
            } catch (error) {
                console.error('Error al actualizar el proveedor:', error);
            }
            setModal(false);
        }
    }

    const eliminar = (id, prv_nombre) =>{
        const alerta = Swal.mixin({ buttonsStyling:true});
            alerta.fire({
            title:'Seguro de eliminar el proveedor '+id + ' '+prv_nombre,
            text:'Se perderá el proveedor',
            icon:'question', showCancelButton:true,
            confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
            cancelButtonText:'<i class="fa-solid fa-ban"></i>No, Cancelar'
        }).then((result) => {
            if(result.isConfirmed){
                Inertia.delete(`/proveedor/${id}`, {
                    onSuccess: () => {
                        alert('Proveedor eliminado exitosamente.');
                    },
                    onError: (errors) => {
                        console.error('Error al eliminar el proveedor:', errors);
                    },
                });
            }
        });
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setData((Data) => ({
            ...Data,
            [name]: value,
        }));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}           
        >
        <div className="p-6">
            {role !== 'User' && (
                <> 
                    <button
                        className="bg-blue-500 text-white px-4 py-1 rounded mb-4"
                        onClick={() => openModal(1)}
                        > Crear Proveedor 
                    </button>
                </>
            )}
            <Link
                href="/dashboard"
                className="bg-green-500 text-white px-4 py-1 mx-4 rounded mb-4"
            > Al Menú
            </Link>
            <div className="bg-white grid v-screen place-items-center py-1">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className='px-2 py-1'>#</th>
                            <th className='px-2 py-1'>NOMBRE</th>
                            <th className='px-2 py-1'>TELEFONO</th>
                            <th className='px-2 py-1'>DOCUMENTO</th>
                            <th className='px-2 py-1'>CORREO</th>
                            <th className='px-2 py-1'>CALIFICACIÓN</th>
                            <th className='px-2 py-1'>ESTADO</th>
                            <th className='px-2 py-1' colSpan={2}></th>
                            
                        </tr>
                    </thead>
                
                    <tbody>
                        {props.proveedores.data.map((proveedor) => (
                            <tr key={proveedor.id}>
                                <td className='border border-gray-400 px-2 py-1'>{proveedor.id}</td>
                                <td className='border border-gray-400 px-2 py-1'>{proveedor.prv_nombre}</td>
                                <td className='border border-gray-400 px-2 py-1'>{proveedor.prv_telefono}</td>
                                <td className='border border-gray-400 px-2 py-1'>{proveedor.prv_tipo_doc}-{proveedor.prv_numero_doc}</td>
                                <td className='border border-gray-400 px-2 py-1'>{proveedor.prv_email}</td>
                                <td className='border border-gray-400 px-2 py-1'>{proveedor.prv_calificacion}</td>
                                <td className='border border-gray-400 px-2 py-1'>{proveedor.prv_estado}</td>
      
                                <td className='border border-gray-400 px-2 py-1'>
                                    <button
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    onClick={() => {
                                        setData(proveedor); // Precarga los datos en el formulario
                                        openModal(0); //                                         
                                    }}
                                >
                                    Editar
                                </button>
                                </td>
                                <td className='border border-gray-400 px-2 py-1'>
                                    <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded'
                                    onClick={() => eliminar(proveedor.id,proveedor.prv_nombre)}>
                                    Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        
                    <Pagination class="mt-6" links={props.proveedores.links} />
   
            </div>
        </div>
            <Modal show={modal} onClose={closeModal}>
                <h2 className="p-3 text-lg font-medium text-gray-900">
                    {title}
                </h2>
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out scale-100">
                    <form onSubmit={save}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <MiInput  Id="prv_nombre" Type="text" Label="Nombre Proveedor" onChange={handleChange}
                                classNameI="md:col-span-2" maxLength ="100" data ={data.prv_nombre} required={true}  
                                OnChange = {handleChange} ></MiInput>

                            <MiInput  Id="prv_telefono" Type="text" Label="Teléfono" onChange={handleChange}
                                classNameI="md:col-span-2" maxLength ="20" data ={data.prv_telefono} required={true}  
                                OnChange = {handleChange} ></MiInput>

                            <MiLista Id="prv_tipo_doc"  Label="Tipo Documento"  data ={data.prv_tipo_doc} 
                             options = {tipoDocOptions} OnChange={handleChange} required={true}></MiLista>                                   


                            <MiInput  Id="prv_numero_doc" Type="text" Label="Número ocumento" onChange={handleChange}
                                classNameI="" maxLength ="20" data ={data.prv_numero_doc} required={true}  
                                OnChange = {handleChange} ></MiInput>

                            <MiInput  Id="prv_email" Type="mail" Label="Teléfono" onChange={handleChange}
                                classNameI="md:col-span-2" maxLength ="20" data ={data.prv_email} required={true}  
                                OnChange = {handleChange} ></MiInput>

                            <MiLista Id="prv_estado"  Label="Estado"  data ={data.prv_estado} 
                            options = {estadoOptions} OnChange={handleChange} required={true}></MiLista>                                

                            <MiInput  Id="prv_calificacion" Type="text" Label="Calificación" onChange={handleChange}
                                classNameI="" maxLength ="10" data ={data.prv_calificacion} required={true}  
                                OnChange = {handleChange} ></MiInput>

                            <div className="flex justify-end">
                                <button type="button"
                                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded'
                                    onClick={() => setModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button processing={processing} 
                                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold mx-3 py-1 px-1 rounded'>
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
