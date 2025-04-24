import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import Modal from '@/Components/Modal';
import { useRef, useState, React } from 'react';
import { Head ,useForm, usePage, Link} from '@inertiajs/react';
import Swal from 'sweetalert2';
import Pagination from '@/Components//Pagination';
import MiInput from '@/Components/MiInput';
import MiLista from '@/Components/MiLista';

export default function Producto(props) {
        const user = usePage().props.auth.user;
        const [modal,setModal] = useState(false);
        const [title,setTitle] = useState('');
        const [operation,setOperation] = useState(1);

        const { data,setData,delete:destroy,post,put,
        processing,reset,errors} = useForm({
            id:'',    
            prd_empresa_id:user.empresa_id,   
            prd_subgrupo_id:'',
            prd_titulo: '',
            prd_detalle: '',
            prd_estado: 'A',
        });

        const [subgrupos, setSubgrupos] = useState(props.subgrupos);

        const [role, setRole] = useState(user.role)     

        const openModal = (op) =>{
            setModal(true);
            setOperation(op);
            if(op === 1){
                setTitle('Añadir producto');
                setData({            id:'',  prd_empresa_id:user.empresa_id,   prd_subgrupo_id:'',
                    prd_titulo: '', prd_detalle: '',prd_estado: 'A',});   
            }
            else{
                setTitle('Modificar producto');
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
                    const response = Inertia.post(`/producto`, data);
                    alert('Datos actualizados exitosamente');
                    console.log('Respuesta:', response);
                } catch (error) {
                    console.error('Error al crear el producto:', error);
                }
            }
            else{      
                try {
                    const response = Inertia.put(`/producto/${data.id}`, data);
                    alert('Datos actualizados exitosamente');
                    console.log('Respuesta:', response);
                } catch (error) {
                    console.error('Error al actualizar el producto:', error);
                }
                setModal(false);
            }
        }
    
        const eliminar = (id, prd_titulo) =>{
            const alerta = Swal.mixin({ buttonsStyling:true});
                alerta.fire({
                title:'Seguro de eliminar el producto '+id + ' '+prd_titulo,
                text:'Se perderá el producto',
                icon:'question', showCancelButton:true,
                confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
                cancelButtonText:'<i class="fa-solid fa-ban"></i>No, Cancelar'
            }).then((result) => {
                if(result.isConfirmed){
                    Inertia.delete(`/producto/${id}`, {
                        onSuccess: () => {
                            alert('producto eliminado exitosamente.');
                        },
                        onError: (errors) => {
                            console.error('Error al eliminar el producto:', errors);
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
                                    > Crear Producto 
                                </button>
                            </>
                        )}
                        <Link
                            href="/dashboard"
                            className="bg-green-500 text-white px-4 py-1 mx-4 rounded mb-4"
                            > Al Menú
                        </Link>
                        <span className='bg-blue-100'> PRODUCTOS A COTIZAR</span> 
                    </div>
                    <div className="bg-white grid v-screen place-items-center py-1">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className='bg-gray-100'>
                                    <th className='px-2 py-1'>#</th>
                                    <th className='px-2 py-1'>SUB GRUPO</th>
                                    <th className='px-2 py-1'>TITULO PRODUCTO</th>
                                    <th className='px-2 py-1'>DETALLE</th>
                                    <th className='px-2 py-1'>ESTADO</th>
                                    <th className='px-2 py-1' colSpan={2}></th>
                                </tr>
                            </thead>
      
                            <tbody>
                                {props.productos.data.map((producto) => (
                                    <tr key={producto.producto_id}>
                                        <td className='border border-gray-400 px-2 py-1'>{producto.id}</td>
                                        <td className='border border-gray-400 px-2 py-1'>{producto.sgr_titulo}</td>
                                        <td className='border border-gray-400 px-2 py-1'>{producto.prd_titulo}</td>
                                        <td className='border border-gray-400 px-2 py-1'>{producto.prd_detalle}</td>
                                        <td className='border border-gray-400 px-2 py-1'>{producto.prd_estado}</td>                
                                        <td className='border border-gray-400 px-2 py-1'>
                                            <button
                                            className="bg-yellow-500 text-white px-2 py-1 rounded"
                                            onClick={() => {
                                                setData(producto); // Precarga los datos en el formulario
                                                openModal(0);                                          
                                            }}
                                        >
                                            Editar
                                        </button>
                                        </td>
                                        <td className='border border-gray-400 px-2 py-1'>
                                            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded'
                                            onClick={() => eliminar(producto.id,producto.sgr_titulo+' - '+producto.prd_titulo)}>
                                            Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                            <Pagination class="mt-6" links={props.productos.links} />
                    </div>   
                    <Modal show={modal} onClose={closeModal}>
                        <h2 className="p-3 text-lg font-medium text-gray-900">
                            {title}
                        </h2>
                        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out scale-100">
                        <form onSubmit={save}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>  
                                    <label htmlFor="prd_subgrupo_id" className="block text-sm font-medium text-gray-700">Sub Grupo</label>
                                    <select
                                        id="prd_subgrupo_id" name="prd_subgrupo_id"
                                        value={data.prd_grupo_id}
                                        onChange={handleChange} 
                                        required={true}
                                        className={`w-full px-1 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 'border-gray-300'}`}
                                    >
                                        {subgrupos.map((subgrupo) => (
                                            <option key={subgrupo.id} value={subgrupo.id}>
                                                {subgrupo.sgr_titulo}
                                            </option>
                                        ))}

                                    </select>
                                </div>
        
  


                                <MiInput  Id="prd_titulo" Type="text" Label="Titulo Producto" onChange={handleChange}
                                classNameI="md:col-span-2" maxLength ="50" data ={data.prd_titulo} required={true}  
                                OnChange = {handleChange} ></MiInput>

                                <MiInput  Id="prd_detalle" Type="text" Label="Detalles" onChange={handleChange}
                                classNameI="md:col-span-2" maxLength ="150" data ={data.prd_detalle} required={true}
                                OnChange = {handleChange} ></MiInput>
                                
                                <MiLista Id="prd_estado"  Label="Estado"  data ={data.prd_estado} 
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

                </AuthenticatedLayout>
            )

}