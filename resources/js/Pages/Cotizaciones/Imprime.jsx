
import {useForm, usePage, Link} from '@inertiajs/react';
import React, { useState} from 'react';


export default function Imprime(props) {

    const [cotizacion, setCotizacion] = useState(props.cotizaciones);

    const [cotdetalles, setCotdetalles]  = useState(props.cotdetalles);
    
    const hoy = (d) => {
        return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
      }
      
    return (
        <>
           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-1">            
                    <div className="p-0 text-lg font-medium text-gray-900 text-center">
                        <h1>{cotizacion[0].emp_nombre}</h1>
                    </div>
                    <div className="p-0 text-sm text-gray-900 text-center"><p>{cotizacion[0].emp_direccion}</p></div>
                    <div className="p-0 text-sm text-gray-900 text-center">Tel: {cotizacion[0].emp_telefono}</div>
                    <div className="p-0 text-sm text-gray-900 text-center">Identificación: {cotizacion[0].emp_tipodoc} - {cotizacion[0].emp_nrodoc}</div>
                </div>
                <br></br>
                <div className="">
                    <table className="w-full border-collapse border border-gray-800">
                        <tbody>
                            <tr>
                                <td className="w-full border-collapse border border-gray-500">Solicitud de Cotización Número : </td>
                                <td className="w-full border-collapse border border-gray-500" >{cotizacion[0].cot_numero}</td>           
                            
                            </tr>
                            <tr>
                                <td className="w-full border-collapse border border-gray-500">Fecha cotización</td>
                                <td className="col-span-2 border-collapse border border-gray-500" >{cotizacion[0].cot_fecha}</td>    

                            </tr>
                            <tr>                      
                                <td className="w-full border-collapse border border-gray-500" colSpan="4"> {cotizacion[0].cot_detalle}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br />
                <div className="grid grid-cols-1 md:grid-cols-1 gap-1 p-0 text-md text-gray-900 text-center">
                    <p>Nuestra empresa está interezada en recibir de Ustedes una</p>
                    <p>cotización para la adquisición de los siguientes productos.</p>
                </div>
                 <br></br>
                <div className="bg-white grid v-screen place-items-center py-1 text-sm">
                    <table className="w-full border-collapse border border-gray-800">
                        <thead>
                            <tr className='bg-gray-100'>
                                <th className='px-2 py-1'>ARTICULO</th>
                                <th className='px-2 py-1'>DESCRIPCION</th>
                                <th className='px-2 py-1'>CANTIDAD</th>
                                <th className='px-2 py-1'>UNIDAD</th>

                            </tr>
                        </thead>

                        <tbody>
                            {cotdetalles.map((cotizacion) => ( 
                                 <tr key={cotizacion.id}>
                                    <td className='border border-gray-400 px-2 py-1'>{cotizacion.prd_titulo}</td>
                                    <td className='border border-gray-400 px-2 py-1'>{cotizacion.prd_detalle}</td>
                                    <td className='border border-gray-400 px-2 py-1'>{cotizacion.cds_cantidad}</td>
                                    <td className='border border-gray-400 px-2 py-1'>{cotizacion.cds_unidadMedida}</td>
                                 </tr>
                            ))}
                        </tbody>
                    </table>
                    <br />
                    <p> Enviar su oferta a nuestro correo haciendo referencia al número de
                    solicitud de cotización. </p>
                    <p>Por favor presentar su oferta antes del :
                    99/99/999</p>
                    <p>Correo : {cotizacion[0].emp_email}</p>
                </div>
            </div>      
            <div className="p-6">
              
                 <Link
                    href={`/imprimepdf/${cotizacion[0].cot_numero}`}
                    className="bg-green-500 text-white px-4 py-1 mx-4 rounded mb-4"
                    > Imprimir
                </Link>
           
                <Link
                    href="/cotizacion"
                    className="bg-green-500 text-white px-4 py-1 mx-4 rounded mb-4"
                    > A cotizaciones
                </Link>
           
            </div>   
        </>
    )
}