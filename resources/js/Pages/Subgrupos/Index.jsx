import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import Modal from '@/Components/Modal';
import { useRef, useState, React } from 'react';
import { Head ,useForm, usePage, Link} from '@inertiajs/react';
import Swal from 'sweetalert2';
import Pagination from '@/Components//Pagination';
import MiInput from '@/Components/MiInput';
import MiLista from '@/Components/MiLista';

export default function Subgrupo(props) {
    const user = usePage().props.auth.user;
    const [modal,setModal] = useState(false);
    const [title,setTitle] = useState('');
    const [operation,setOperation] = useState(1);

    const { data,setData,delete:destroy,post,put,
    processing,reset,errors} = useForm({
        id:'',    
        sgr_empresa_id:user.empresa_id,   
        sgr_grupo_id:'',
        sgr_titulo: '',
        sgr_detalle: '',
        sgr_estado: 'A',
    });

    const [grupos, setGrupos] = useState(props.grupos);

    const [role, setRole] = useState(user.role) 
        
    const openModal = (op) =>{
        setModal(true);
        setOperation(op);
        if(op === 1){
            setTitle('Añadir subgrupo');
            setData({sgr_empresa_id:user.empresa_id,sgr_grupo_id:'', sgr_titulo:'', sgr_detalle:'', sgr_estado:'A'});   
        }
        else{
            setTitle('Modificar subgrupo');
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

    const save = (e) =>{
        e.preventDefault();
        if(operation === 1){  
            try {
                const response = Inertia.post(`/subgrupo`, data);
                alert('Datos actualizados exitosamente');
                console.log('Respuesta:', response);
            } catch (error) {
                console.error('Error al crear el subgrupo:', error);
            }
        }
        else{      
            try {
                const response = Inertia.put(`/subgrupo/${data.id}`, data);
                alert('Datos actualizados exitosamente');
                console.log('Respuesta:', response);
            } catch (error) {
                console.error('Error al actualizar el subgrupo:', error);
            }
            setModal(false);
        }
    }

    const eliminar = (id, sgr_titulo) =>{
        const alerta = Swal.mixin({ buttonsStyling:true});
            alerta.fire({
            title:'Seguro de eliminar el subgrupo '+id + ' '+sgr_titulo,
            text:'Se perderá el subgrupo',
            icon:'question', showCancelButton:true,
            confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
            cancelButtonText:'<i class="fa-solid fa-ban"></i>No, Cancelar'
        }).then((result) => {
            if(result.isConfirmed){
                Inertia.delete(`/subgrupo/${id}`, {
                    onSuccess: () => {
                        alert('subgrupo eliminado exitosamente.');
                    },
                    onError: (errors) => {
                        console.error('Error al eliminar el subgrupo:', errors);
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
                        > Crear SubGrupo 
                    </button>
                </>
            )}
            <Link
                href="/dashboard"
                className="bg-green-500 text-white px-4 py-1 mx-4 rounded mb-4"
                > Al Menú
            </Link>
            <span className='bg-blue-100'> SUBGRUPOS DE PRODUCTOS</span> 
            <div className="bg-white grid v-screen place-items-center py-1">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className='px-2 py-1'>#</th>
                            <th className='px-2 py-1'>GRUPO</th>
                            <th className='px-2 py-1'>TITULO</th>
                            <th className='px-2 py-1'>DETALLE</th>
                            <th className='px-2 py-1'>ESTADO</th>
                            <th className='px-2 py-1' colSpan={2}></th>
                        </tr>
                    </thead>
                 
                    <tbody>
                        {props.subgrupos.data.map((subgrupo) => (
                            <tr key={subgrupo.subgrupo_id}>
                                <td className='border border-gray-400 px-2 py-1'>{subgrupo.subgrupo_id}</td>
                                <td className='border border-gray-400 px-2 py-1'>{subgrupo.grp_titulo}</td>
                                <td className='border border-gray-400 px-2 py-1'>{subgrupo.sgr_titulo}</td>
                                <td className='border border-gray-400 px-2 py-1'>{subgrupo.sgr_detalle}</td>
                                <td className='border border-gray-400 px-2 py-1'>{subgrupo.sgr_estado}</td>
      
                                <td className='border border-gray-400 px-2 py-1'>
                                    <button
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    onClick={() => {
                                        setData(subgrupo); // Precarga los datos en el formulario
                                        openModal(0);                                          
                                    }}
                                >
                                    Editar
                                </button>
                                </td>
                                <td className='border border-gray-400 px-2 py-1'>
                                    <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded'
                                    onClick={() => eliminar(subgrupo.id,subgrupo.grp_titulo+' '+subgrupo.sgr_titulo)}>
                                    Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 <Pagination class="mt-6" links={props.subgrupos.links} />
            </div>    
                <Modal show={modal} onClose={closeModal}>
                <h2 className="p-3 text-lg font-medium text-gray-900">
                    {title}
                </h2>
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out scale-100">
                    <form onSubmit={save}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* <MiLista Id="sgr_grupo_id"  Label="Grupo"  data ={data.sgr_grupo_id} 
                                options = {grupos} OnChange={handleChange} required={true}></MiLista>                                    */}

                            <div>  
                                <label htmlFor="sgr_grupo_id" className="block text-sm font-medium text-gray-700">Grupos </label>

                                <select
                                    id="sgr_grupo_id" name="sgr_grupo_id"
                                    value={data.sgr_grupo_id}
                                    onChange={handleChange} 
                                    required={true}
                                    className={`w-full px-1 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 'border-gray-300'}`}
                                >
                                {grupos.map((grupo) => (
                                        <option key={grupo.id} value={grupo.id}>
                                            {grupo.grp_titulo}
                                        </option>
                                    ))}

                                </select>
                            </div>
    

                            <MiInput  Id="sgr_titulo" Type="text" Label="Titulo SubGrupo" onChange={handleChange}
                            classNameI="md:col-span-2" maxLength ="50" data ={data.sgr_titulo} required={true}  
                            OnChange = {handleChange} ></MiInput>

                            <MiInput  Id="sgr_detalle" Type="text" Label="Detalles" onChange={handleChange}
                            classNameI="md:col-span-2" maxLength ="150" data ={data.sgr_detalle} required={true}
                            OnChange = {handleChange} ></MiInput>
                            
                            <MiLista Id="sgr_estado"  Label="Estado"  data ={data.sgr_estado} 
                            options = {estadoOptions} OnChange={handleChange} required={true}></MiLista>
            
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

                {/* Modal */}

            </div>
        </AuthenticatedLayout>
    );
}
