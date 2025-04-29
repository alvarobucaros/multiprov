import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import Modal from '@/Components/Modal';


import React, { useState, useEffect } from 'react';

import { Head ,useForm, usePage, Link} from '@inertiajs/react';
import Swal from 'sweetalert2';
import Pagination from '@/Components//Pagination';
import MiInput from '@/Components/MiInput';
import MiLista from '@/Components/MiLista';
import axios from 'axios';

export default function Producto(props) {
    const user = usePage().props.auth.user;
    const [modal,setModal] = useState(false);
    // const [modalPr,setModalPr] = useState(false);
    const [title,setTitle] = useState('');
    const [operation,setOperation] = useState(1);

    const { data,setData,delete:destroy,post,put,
    processing,reset,errors} = useForm({
        id:'',       
        cot_empresa_id:user.empresa_id,
        cot_numero: '',
        cot_fecha: '',
        cot_titulo: '',
        cot_detalle: '',
        emp_nrocotizacion: '',
        cot_estado: 'A',
    });

    // Estado para guardar los detalles de la cotización
    const [detalles, setDetalles] = useState([]);

    // Estado para manejar errores
    const [errorDetalles, setErrorDetalles] = useState(null);
    // Estado para privilegios de usuario
    const [role, setRole] = useState(user.role) 
    

    const openModal = (op) =>{
        setModal(true);
        setOperation(op);
        if(op === 1){
            setTitle('Añadir cotizacion');
            setData({cot_empresa_id:user.empresa_id,  cot_numero: '', cot_fecha: '', cot_titulo: '',
                cot_detalle: '', emp_nrocotizacion: '', cot_estado: 'A'});   
        }
        else{
            setTitle('Modificar cotizacion');
        }
    }

    const closeModal = () =>{
        setModal(false);
    }

    // const openModalPr = (id) =>{
    //     setTitle('Detalle cotizacion ') ;
    //         setDetalles([]); // Limpiar los detalles antes de cargar nuevos datos
    //       //  const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/cotizaciondetalle/${id}`;
    //         const apiUrl = `http://localhost:8000/cotizaciondetalle/${id}`;
    //         // fetch(apiUrl)
    //         // .then(response => {
    //         //   if (!response.ok) {
    //         //     throw new Error(`HTTP error! status: ${response.status}`);
    //         //   }
    //         //   return response.json(); // Convertir la respuesta a JSON
    //         // })
    //         // .then(data => {
    //         //   console.log("Detalles recibidos:", data);
    //         //   setDetalles(data); // Guardar los detalles en el estado
    //         // })
    //         // .catch(error => {
    //         //   console.error("Error al cargar detalles de la cotización:", error);
    //         //   setErrorDetalles("Error al cargar los detalles de la cotización.");
    //         // });
    //         // axios.get(apiUrl)
    //         // .then(response => {
    //         //     console.log("Detalles recibidos:", response.data);
    //         //     setDetalles(response.data); // Guarda los detalles en el estado
    //         // })
    //         // .catch(error => {
    //         //     console.error("Detalles del error:", error.response || error.message);
    //         //     setErrorDetalles("Error al cargar los detalles de la cotización.");
    //         // })
 
    //     // setModalPr(true);
    // }
    
    // const closeModalPr = () =>{
   
    //     setModalPr(false);
    // }
    

    const estadoOptions = [
        { value: '', label: '-- Selecciona un estado --' }, // O pción por defecto/placeholder
        { value: 'I', label: 'Iniciada' },
        { value: 'P', label: 'En proceso' },
        { value: 'C', label: 'Cerrada' },
    ];

      const save = (e) =>{
          e.preventDefault();
          if(operation === 1){  
              try {
                  const response = Inertia.post(`/cotizacion`, data);
                  alert('Datos creados exitosamente');
                  console.log('Respuesta:', response);
              } catch (error) {
                  console.error('Error al crear la cotizacion:', error);
              }
          }
          else if(operation === 0){      
              try {
                  const response = Inertia.put(`/cotizacion/${data.id}`, data);
                  alert('Datos actualizados exitosamente');
                  console.log('Respuesta:', response);
              } catch (error) {
                  console.error('Error al actualizar la cotizacion:', error);
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
                Inertia.delete(`/cotizacion/${id}`, {
                    onSuccess: () => {
                        alert('cotizacion eliminado exitosamente.');
                    },
                    onError: (errors) => {
                        console.error('Error al eliminar la cotizacion:', errors);
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
                            > Crear cotiza 
                        </button>
                    </>
                )}
                <Link
                    href="/dashboard"
                    className="bg-green-500 text-white px-4 py-1 mx-4 rounded mb-4"
                    > Al Menú
                </Link>
                <span className='bg-blue-100'> COTIZAR PRODUCTOS</span> 
            </div>

            <div className="bg-white grid v-screen place-items-center py-1">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className='px-2 py-1'>#</th>
                            <th className='px-2 py-1'>NUMERO</th>
                            <th className='px-2 py-1'>FECHA</th>
                            <th className='px-2 py-1'>TITULO</th>
                            <th className='px-2 py-1'>DETALLE</th>
                            <th className='px-2 py-1'>ESTADO</th>
                            <th className='px-2 py-1' colSpan={3}>COMANDOS</th>
                        </tr>
                    </thead>
                  
                    <tbody>
                        {props.cotizaciones.data.map((cotizacion) => (
                            <tr key={cotizacion.id}>
                                <td className='border border-gray-400 px-2 py-1'>{cotizacion.id}</td>
                                <td className='border border-gray-400 px-2 py-1'>{cotizacion.cot_numero}</td>
                                <td className='border border-gray-400 px-2 py-1'>{cotizacion.cot_fecha}</td>
                                <td className='border border-gray-400 px-2 py-1'>{cotizacion.cot_titulo}</td>
                                <td className='border border-gray-400 px-2 py-1'>{cotizacion.cot_detalle}</td>
                                <td className='border border-gray-400 px-2 py-1'>{cotizacion.cot_estado}</td>
                                {role !== 'User' && (
                                    <> {/* <-- Fragmento para agrupar los td */}
                                    <td className='border border-gray-400 px-1 py-1 w-12'>
                                        <button
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                        onClick={() => {
                                            setData(cotizacion); // Precarga los datos en el formulario
                                            openModal(0);                                          
                                        }}
                                        >
                                        Editar
                                        </button>
                                    </td>
                                    <td className='border border-gray-400 px-1 py-1 w-12'>
                                        <Link
                                            href={`/cotizaciondetalle/${cotizacion.id}`}
                                            className="mx-4 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-1 rounded"
                                        >Detalles
                                        </Link>
                                    </td>
                                    <td className='border border-gray-400 px-1 py-1 w-12'>
                                        <Link
                                            href={`/cotizaciondetalle/${cotizacion.id}`}
                                            className="mx-4 bg-blue-500 hover:bg-green-700 text-white font-bold py-1 px-1 rounded"
                                        >Imprimir
                                        </Link> 
                                    </td>
                                    <td className='border border-gray-400 px-1 py-1 w-12'>
                                        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded'
                                       
                                       onClick={() => eliminar(cotizacion.id, cotizacion.titulo+' - '+cotizacion.cot_numero+' del '+cotizacion.cot_fecha)}>
                                        Eliminar
                                        </button>
                                    </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                    <Pagination class="mt-6" links={props.cotizaciones.links} />
            </div> 

            <Modal show={modal} onClose={closeModal}>
                <h2 className="p-3 text-lg font-medium text-gray-900">
                    {title} 
                </h2>
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out scale-100">
                    <form onSubmit={save}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <MiInput  Id="cot_numero" Type="number" Label="Número" onChange={handleChange}
                        classNameI="md:col-span-2" maxLength ="10" data ={data.cot_numero} required={true}  
                        OnChange = {handleChange} ></MiInput>

                        <MiInput  Id="cot_fecha" Type="date" Label="Fecha" onChange={handleChange}
                        classNameI="md:col-span-2" maxLength ="16" data ={data.cot_fecha} required={true}  
                        OnChange = {handleChange} ></MiInput>

                        <MiInput  Id="cot_titulo" Type="text" Label="Titulo" onChange={handleChange}
                        classNameI="md:col-span-2" maxLength ="50" data ={data.cot_titulo} required={true}
                        OnChange = {handleChange} ></MiInput>

                        <MiInput  Id="cot_detalle" Type="text" Label="Detalles" onChange={handleChange}
                        classNameI="md:col-span-2" maxLength ="150" data ={data.cot_detalle} required={true}
                        OnChange = {handleChange} ></MiInput>
                    
                        <MiLista Id="cot_estado"  Label="Estado"  data ={data.cot_estado} 
                        options = {estadoOptions} OnChange={handleChange} required={true}></MiLista>

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
{/* <p>
            <Modal show={modalPr} onClose={closeModalPr}>
                <h2 className="p-3 text-lg font-medium text-green-900">
                    {title} {data.cot_titulo} Nro. {data.cot_numero}   del  {data.cot_fecha}                    
                </h2>
                <br />
                <div className="flex justify-end">
                    <button type="button"
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded'
                        onClick={ closeModalPr}
                    >
                        Regresa
                    </button>
                    <Link
                        href="/dashboard"
                        className="mx-4 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-1 rounded"
                    > Crear Detalles
                </Link>
                </div>
            </Modal>
</p> */}
    </AuthenticatedLayout>
    );
}
                


