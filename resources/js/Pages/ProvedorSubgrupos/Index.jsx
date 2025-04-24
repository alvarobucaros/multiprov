import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import Modal from '@/Components/Modal';
import {useState, React } from 'react';
import {useForm, usePage, Link} from '@inertiajs/react';
import Swal from 'sweetalert2';
import Pagination from '@/Components//Pagination';
import MiInput from '@/Components/MiInput';
import MiLista from '@/Components/MiLista';
 
export default function ProveedorSubgrupo(props) {
    const user = usePage().props.auth.user;
    const [modal,setModal] = useState(false);
    const [title,setTitle] = useState('');
    const [operation,setOperation] = useState(1);

    const { data,setData,delete:destroy,post,put,
    processing,reset,errors} = useForm({
        id:'',
        prv_proveedor_id:'',
        prv_subgrupo_id:'',
        grp_titulo:'',       
    });

    const [role, setRole] = useState(user.role) 
    
    const openModal = (op) =>{
        setModal(true);
        setOperation(op);
        if(op === 1){
            setTitle('Añadir Subgrupo al Proveedor');
            setData({prv_proveedor_id:'', prv_subgrupo_id:'', grp_titulo:''});
        }
        else{
            setTitle('Modificar Subgrupo al Proveedor');
        }
    }

    const closeModal = () =>{
        setModal(false);
    }


    const save = (e) =>{
        e.preventDefault();
        if(operation === 1){  
            try {
                const response = Inertia.post(`/proveedorsub`, data);
                alert('Datos grabados exitosamente');
                console.log('Respuesta:', response);
            } catch (error) {
                console.error('Error al crear el Subgrupo del proveedor: ', error);
            }
        }
        else{      
            try {
                const response = Inertia.put(`/proveedorsub/${data.id}`, data);
                alert('Datos actualizados exitosamente');
                console.log('Respuesta:', response);
            } catch (error) {
                console.error('Error al actualizar el Subgrupo del proveedor:', error);
            }
            setModal(false);
        }
    }

    //'proveedorsubgrupos.id', 'proveedorsubgrupos.prv_proveedor_id', 'proveedorsubgrupos.prv_subgrupo_id', 'subgrupos.sgr_titulo as grp_titulo'

    const eliminar = (id, grp_titulo) =>{
        const alerta = Swal.mixin({ buttonsStyling:true});
            alerta.fire({
            title:'Seguro de eliminar el Subgrupo del proveedor '+id + ' '+grp_titulo,
            text:'Se perderá el Subgrupo',
            icon:'question', showCancelButton:true,
            confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
            cancelButtonText:'<i class="fa-solid fa-ban"></i>No, Cancelar'
        }).then((result) => {
            if(result.isConfirmed){
                Inertia.delete(`/proveedorsub/${id}`, {
                    onSuccess: () => {
                        alert('Subgrupo eliminado exitosamente.');
                    },
                    onError: (errors) => {
                        console.error('Error al eliminar el Subgrupo:', errors);
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
                        > Crear Subgrupo al proveedor 
                    </button>
                </>
            )}
            <Link
                href="/proveedor"
                className="bg-green-500 text-white px-4 py-1 mx-4 rounded mb-4"
            > Al proveedor
            </Link>
            <span>PROVEEDOR SUB GRUPO DE PRODUCTOS</span>
            <div className="bg-white grid v-screen place-items-center py-1">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className='px-2 py-1'>#</th>
                            <th className='px-2 py-1'>GRUPO</th>

                            <th className='px-2 py-1' colSpan={2}></th>
                            
                        </tr>
                    </thead>
                
                    <tbody>
                        {props.provsubgrupos.data.map((provsubgrupo) => (
                            <tr key={provsubgrupo.id}>
                                <td className='border border-gray-400 px-2 py-1'>{provsubgrupo.id}</td>
                                <td className='border border-gray-400 px-2 py-1'>{provsubgrupo.grp_titulo}</td>
      
                                <td className='border border-gray-400 px-2 py-1 w-12'>
                                    <button
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    onClick={() => {
                                        setData(provsubgrupo); // Precarga los datos en el formulario
                                        openModal(0); //                                         
                                    }}
                                >
                                    Editar
                                </button>
                                </td>
                                <td className='border border-gray-400 px-2 py-1 w-12'>
                                    <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded'
                                    onClick={() => eliminar(provsubgrupo.id,provsubgrupo.grp_titulo)}>
                                    Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        
                    <Pagination class="mt-6" links={props.provsubgrupos.links} />
   
            </div>
        </div>
            <Modal show={modal} onClose={closeModal}>
                <h2 className="p-3 text-lg font-medium text-gray-900">
                    {title}
                </h2>
                {/* <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out scale-100">
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
                </div> */}
            </Modal>
        </AuthenticatedLayout>
    );
}
