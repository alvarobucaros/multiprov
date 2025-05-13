{{-- resources/views/pdf/cotizacion.blade.php --}}
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Cotización {{ $cotizacion->id }}</title>
    <style>
        /* Estilos CSS básicos para tu PDF */
        body {
            font-family: 'Helvetica', 'Arial', sans-serif; /* mPDF soporta fuentes comunes */
            font-size: 12px;
            line-height: 1.4;
            color: #333;
        }
        h1 {
            color: #0056b3;
            border-bottom: 1px solid #0056b3;
            padding-bottom: 5px;
        }
        .empresa-info p, .cotizacion-info p {
            margin: 5px 0;
        }
        .empresa-nombre {
            font-size: 1.5em;
            text-align: center;
            color: #777;
        }
        .empresa-titulo {
            font-size: 1.3em;
            text-align: center;
            color: #777;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .footer {
            position: fixed; /* Para que aparezca en todas las páginas si configuras mPDF para ello */
            bottom: 0px;
            left: 0px;
            right: 0px;
            height: 50px;
            text-align: center;
            font-size: 1.0em;
            color: #779;
        }
        .notas_tit{
        text-align: center;
        font-size: 1.2em;
        color: #777;
        }
        .notas_cot{
            text-align: left;
        }
        .nota_fin{
            box-shadow: 0 0 10px rgba(0,0, 0,0,1);
        }

        /* Puedes añadir aquí todos los estilos que necesites para tu cotización */
        /* Por ejemplo, para una tabla de ítems: */
        .items-table th.descripcion { width: 50%; }
        .items-table th.cantidad { width: 10%; text-align: center; }
        .items-table th.precio-unitario, .items-table th.subtotal { width: 20%; text-align: right; }
        .items-table td { vertical-align: top; }
        .items-table td.text-right { text-align: right; }
        .items-table td.text-center { text-align: center; }
        .total-general {
            margin-top: 20px;
            text-align: right;
            font-size: 1.3em;
            font-weight: bold;
        }

    </style>
</head>
<body>
    <bookmark content="Inicio del Documento" />

    <div class="">            
   
        <div class="empresa-nombre ">{{$cotizacion->emp_direccion}}</div>
        <div class="empresa-titulo ">Tel: {{$cotizacion->emp_telefono}}</div>
        <div class="empresa-titulo ">Identificación: {{$cotizacion->emp_tipodoc}} - {{$cotizacion->emp_nrodoc}}</div>
    </div>
                
    <div class="header">
        {{-- Puedes poner aquí un logo si lo deseas --}}
        <img src={`/logos/${empresa.emp_logo}`} alt="Logo Empresa" class="logo" />
        <h1>Cotización N°: {{ $cotizacion->cot_numero }}</h1>
    </div>

        <br></br> <hr>
        <div class="">
            <table class="">
                <tbody>
                    <tr>
                        <td class="">Solicitud de Cotización Número : </td>
                        <td class="" >{{$cotizacion->cot_numero}}</td>           
                    
                    </tr>
                    <tr>
                        <td class="">Fecha cotización</td>
                        <td class="" >{{ $cotizacion->cot_fecha }}</td>    

                    </tr>
                    <tr>                      
                        <td class="" colSpan="4"> {{$cotizacion->cot_detalle}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="notas_tit">
            <p>Nuestra empresa está interezada en recibir de Ustedes una cotización para la adquisición de los siguientes productos.</p>
        </div>   
        
        <div class="bg-white grid v-screen place-items-center py-1 text-sm">
            <table class="items-table">
                <thead>
                    <tr class=''>
                        <th class=''>ARTICULO</th>
                        <th class=''>DESCRIPCION</th>
                        <th class=''>CANTIDAD</th>
                        <th class=''>UNIDAD</th>

                    </tr>
                </thead>

                <tbody>
                    @if($cotdetalles && count($cotdetalles) > 0)
                        @foreach($cotdetalles as $cot) 
                            <tr key={cotizacion.id}>
                                <td class='border border-gray-400 px-2 py-1'>{{$cot->prd_titulo}}</td>
                                <td class='border border-gray-400 px-2 py-1'>{{$cot->cds_detalle}} - {{$cot->prd_detalle}}</td>
                                <td class='border border-gray-400 px-2 py-1'>{{$cot->cds_cantidad}}</td>
                                <td class='border border-gray-400 px-2 py-1'>{{$cot->cds_unidadMedida}}</td>
                            </tr>
                        @endforeach 
                    @else
                        <tr>
                            <td colspan="4" style="text-align:center;">No hay ítems en esta cotización.</td>
                        </tr>
                    @endif   
                    </
                </tbody>
            </table>
            <br />
            <div class="notas_tit"> Enviar su oferta a nuestro correo haciendo referencia al número de
            solicitud de cotización. </div>
            <div class="notas_tit">Por favor presentar su oferta antes del :
            99/99/999</div>
            <div class="notas_tit">Correo : {{$cotizacion->emp_email}}</div>
        </div>
        

<br></br><hr>

    <div class="notas_tit">
        <div>Gracias por su preferencia.</div>
        <div>Este documento es una cotización y no implica compromiso de compra.</div>
    </div>

</body>
</html>