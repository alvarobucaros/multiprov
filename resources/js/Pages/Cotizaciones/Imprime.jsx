import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import React, { useState} from 'react';


export default function Imprime(props) {

    const [cotizacion, setCotizacion] = useState(props.cotizaciones);
    
    const hoy = (d) => {
        return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
      }
      
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
        >
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
                <table className="w-full border-collapse border border-gray-800">
                    <tbody>
                        <tr>
                            <td className="w-full border-collapse border border-gray-500">Solicitud de Cotización</td>
                            <td className="w-full border-collapse border border-gray-500" colSpan="2">{cotizacion[0].cot_numero}</td>           
                            <td className="w-full border-collapse border border-gray-500">{cotizacion[0].cot_fecha}</td>
                        </tr>
                        <tr>
                            <td className="w-full border-collapse border border-gray-500">Fecha solicitud</td>
                            <td className="w-full border-collapse border border-gray-500">31</td>    
                            <td className="w-full border-collapse border border-gray-500">05</td>          
                            <td className="w-full border-collapse border border-gray-500">{hoy}</td>

                        </tr>
                        <tr>                      
                            <td className="w-full border-collapse border border-gray-500" colSpan="4"> {cotizacion[0].cot_detalle}</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <div className="grid grid-cols-1 md:grid-cols-1 gap-1 p-0 text-md text-gray-900 text-center">
                    <p>Nuestra empresa está interezada en recibir de Ustedes una</p>
                    <p>cotización para la adquisición de los siguientes productos.</p>
                </div>
                
 
            </div>
          
        </AuthenticatedLayout>
    )
}