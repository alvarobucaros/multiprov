import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import Modal from '@/Components/Modal';
import React, { useState} from 'react';
import {useForm, usePage, Link} from '@inertiajs/react';
import Swal from 'sweetalert2';
import Pagination from '@/Components//Pagination';
import MiInput from '@/Components/MiInput';
import MiTextArea from '@/Components/MiTextArea';


export default function Producto(props) {
    const user = usePage().props.auth.user;
    const [modal,setModal] = useState(false);
    const [title,setTitle] = useState('');
    const [operation,setOperation] = useState(1);

    const [cotizacion, setCotizacion] = useState(props.cotizacion);

     const [productos, setProductos] = useState(props.productos);

    const { data,setData,delete:destroy,post,put,
    processing,reset,errors} = useForm({
        id:'',       
        cds_cotizacion_id:cotizacion.id,
        cds_producto_id:'',
        cds_cantidad:'',
        cds_unidadMedida:'',
        cds_detalle:'',
    });
    
    const [role, setRole] = useState(user.role) 

    const openModal = (op) =>{
        setModal(true);
        setOperation(op);
        if(op === 1){
            setTitle('Añadir cotizacion');
            setData({ cds_cotizacion_id:cotizacion[0].id,
                cds_producto_id:'',
                cds_cantidad:'',
                cds_unidadMedida:'',
                cds_detalle:''});   
        }
        else{
            setTitle('Modificar cotizacion');
        }
    }

    const closeModal = () =>{
        setModal(false);
    }

    const save = (e) =>{
        e.preventDefault();
        if(operation === 1){  
            try {
                const response = Inertia.post(`/cotizaciondetalle`, data);
                alert('Datos creados exitosamente');
                console.log('Respuesta:', response);
            } catch (error) {
                console.error('Error al crear la cotizaciondetalle:', error);
            }
        }
        else if(operation === 0){      
            try {
                const response = Inertia.put(`/cotizaciondetalle/${data.id}`, data);
                alert('Datos actualizados exitosamente');
                console.log('Respuesta:', response);
            } catch (error) {
                console.error('Error al actualizar la cotizaciondetalle:', error);
            }
            setModal(false);
        }
    }
 
    const eliminar = (id, detalle) =>{
        const alerta = Swal.mixin({ buttonsStyling:true});
            alerta.fire({
            title:'Seguro de eliminar la cotizacion '+detalle,  
            text:'Se perderá el cotizacion',
            icon:'question', showCancelButton:true,
            confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
            cancelButtonText:'<i class="fa-solid fa-ban"></i>No, Cancelar'
        }).then((result) => {
            if(result.isConfirmed){
                Inertia.delete(`/cotizaciondetalle/${id}`, {
                    onSuccess: () => {
                        alert('Detalle de la cotización eliminado exitosamente.');
                    },
                    onError: (errors) => {
                        console.error('Error al eliminar la cotizacion detalle:', errors);
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
                            > Crear detalle de cotización 
                        </button>
                    </>
                )}
                <Link
                    href="/cotizacion"
                    className="bg-green-500 text-white px-4 py-1 mx-4 rounded mb-4"
                    > Al Menú
                </Link>
                <span className='bg-blue-100'> DETALLES DE LA COTIZACION : &nbsp; {cotizacion[0].cot_numero} 
                &nbsp; de &nbsp;{cotizacion[0].cot_fecha}  -  {cotizacion[0].cot_titulo}</span> 
            </div>

            <div className="bg-white grid v-screen place-items-center py-1">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className='px-2 py-1'>#</th>
                            <th className='px-2 py-1'>PRODUCTO</th>
                            <th className='px-2 py-1'>CANTIDAD</th>
                            <th className='px-2 py-1'>UNIDAD</th>
                            <th className='px-2 py-1'>DETALLE</th>

                            <th className='px-2 py-1' colSpan={3}>COMANDOS</th>
                        </tr>
                    </thead>

                    <tbody>
                        {props.cotizaciondetalle.map((cotizacionDet, key) => (
                            <tr key={cotizacionDet.id}>
                                <td className='border border-gray-400 px-2 py-1'>{cotizacionDet.id}</td>
                                <td className='border border-gray-400 px-2 py-1'>{cotizacionDet.prd_titulo}</td>
                                <td className='border border-gray-400 px-2 py-1'>{cotizacionDet.cds_cantidad}</td>
                                <td className='border border-gray-400 px-2 py-1'>{cotizacionDet.cds_unidadMedida}</td>
                                <td className='border border-gray-400 px-2 py-1'>{cotizacionDet.cds_detalle}</td>

                                {role !== 'User' && (
                                    <> {/* <-- Fragmento para agrupar los td */}
                                    <td className='border border-gray-400 px-1 py-1 w-12'>
                                        <button
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                        onClick={() => {
                                            setData(cotizacionDet); // Precarga los datos en el formulario
                                            openModal(0);                                          
                                        }}
                                        >
                                        Editar
                                        </button>
                                    </td>
                                    <td className='border border-gray-400 px-1 py-1 w-12'>
                                    <Link
                                        href={`/cotizaciondetalle/${cotizacionDet.id}`}
                                        className="mx-4 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-1 rounded"
                                    >Detalles
                                    </Link>

                                    </td>
                                    <td className='border border-gray-400 px-1 py-1 w-12'>
                                        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded'
                                       
                                       onClick={() => eliminar(cotizacionDet.id, cotizacionDet.prd_titulo+' - '+cotizacionDet.cds_detalle)}>
                                        Eliminar
                                        </button>
                                    </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                   
            </div> 

            <Modal show={modal} onClose={closeModal}>
                <h2 className="p-3 text-lg font-medium text-gray-900">
                    {title} 
                </h2>
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out scale-100">
                    <form onSubmit={save}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>  
                            <label htmlFor="cds_producto_id" className="block text-sm font-medium text-gray-700">Producto </label>
                            <select
                                id="cds_producto_id" name="cds_producto_id"
                                value={data.cds_producto_id}
                                onChange={handleChange} 
                                required={true}
                                className={`w-full px-1 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 'border-gray-300'}`}
                            >
                                <option key={0} value={''}>
                                        {'Seleccione un producto'}
                                </option>
                                {productos.map((producto) => (
                                    <option key={producto.id} value={producto.id}>
                                        {producto.prd_titulo}
                                    </option>
                                ))}
                            </select>                                
                        </div>

                        <MiInput  Id="cds_cantidad" Type="number" Label="Cantidad" onChange={handleChange}
                        classNameI="md:col-span-2" maxLength ="10" data ={data.cds_cantidad} required={true}  
                        OnChange = {handleChange} ></MiInput>

                        <MiInput  Id="cds_unidadMedida" Type="text" Label="Unidad" onChange={handleChange}
                        classNameI="md:col-span-2" maxLength ="16" data ={data.cds_unidadMedida} required={true}  
                        OnChange = {handleChange} ></MiInput>

                        <MiTextArea Id="cds_detalle" Rows="2" Cols="100" Label="Detalles" classNameI="md:col-span-2"
                         data ={data.cds_detalle} required={true} OnChange={handleChange}></MiTextArea>

                        <div className="flex justify-end">
                            <button type="button"
                                className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded'
                                onClick={ closeModal}
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
                


