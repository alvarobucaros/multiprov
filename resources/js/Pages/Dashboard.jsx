import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {BrowserRouter as Router} from 'react-router-dom';
import { Route } from "react-router-dom";
import Cards from '@/Components/Cards';
import { Head, Link , usePage} from '@inertiajs/react';

export default function Dashboard() {
    const user = usePage().props.auth.user;
    return (
        <AuthenticatedLayout
 
        >
   
        <Head title="Proveedores" />
        {user.name ? ( 
            <div className="flex"  >
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 ">
                    <br className='my-2'/>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg flex flex-row ">
                        <Cards titulo={"GRUPOS DE PRODUCTOS"} detalle={"Grupos de productos que cotizan los Proveedores"} href={"/grupo"}/>
                        <Cards titulo={"SUB GRUPOS PRODUCTOS"} detalle={"Los grupos de productos se dividen en subgrupos para crear una cotización"} href={"/subgrupo"}/>
                        <Cards titulo={"PRODUCTOS"} detalle={"Definición genérica de productos que se van a cotizar"} href={"/producto"}/>
                    </div>
                    <br className='my-3'/>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg flex flex-row">
                        <Cards titulo={"PROVEEDORES"} detalle={"Persona naturales o jurídicas que provee productos o servicios"} href={"/proveedor"}/>
                        <Cards titulo={"COTIZACIONES"} detalle={"Relación de subgrupo de productos para que un proveedor presente un documento detallando los productos o servicios ofrecidos con sus precios y condiciones de venta"} href={"/cotizacion"}/>
                        <Cards titulo={"PARAMETROS"} detalle={"Ajustes a nuestra empresa"} href={"/parametro"}/>
                       
                        {user.role === 'Super' ? (<Cards titulo={"USUARIOS"} detalle={"Personas autorizadas para utlizar esta aplicación"} href={"/user"}/>  ) : (
                            
                            <p></p>  
                        )}
                    </div>
                </div>
            </div>
                ) : (
                'Debe autenticarse'
               )} 
        </AuthenticatedLayout>
    );
}
