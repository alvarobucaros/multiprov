<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cotizacion;
use App\Models\Cotizaciondetalle;
use Illuminate\Http\Request;
use Illuminate\Http\Response; // Para respuestas HTTP
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Mpdf\Mpdf; 
use Mpdf\Output\Destination;

class CotizacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $cotizaciones = Cotizacion::where('cot_empresa_id', $user->empresa_id) 
        ->join('empresas', 'cotizaciones.cot_empresa_id', '=', 'empresas.id')
        ->select('empresas.emp_nrocotizacion as cotizaciones.emp_nrocotizacion', 'cotizaciones.cot_numero',
         'cotizaciones.cot_fecha', 'cotizaciones.cot_titulo','cotizaciones.cot_detalle', 
         'cotizaciones.cot_estado','cotizaciones.id' )  
        ->orderBy('cotizaciones.cot_numero', 'DESC')  
        ->paginate(10);   

        return Inertia::render('Cotizaciones/Index', [
            'cotizaciones' => $cotizaciones,
        ]);
    }
    
    public function imprimepdf($id){
        $cotizacion = Cotizacion::where('cotizaciones.id', $id)
        ->join('empresas', 'cotizaciones.cot_empresa_id', '=', 'empresas.id')
        
        ->firstOrFail();

        $cotdetalles = Cotizaciondetalle::where('cds_cotizacion_id', $id)
        ->join('productos', 'cotizaciondetalles.cds_producto_id', '=', 'productos.id')
        ->select('cds_cantidad', 'cds_unidadMedida', 'cds_detalle',  'prd_titulo', 'prd_detalle')
        ->get();

       // dd($cotdetalles);

        return view('pdf', compact( ['cotizacion',  'cotdetalles']))->render();
    }

    public function imprimepdfA($id)
    {
        // Obtener los datos de la cotización
        // Es buena práctica usar 'firstOrFail' para manejar casos donde no se encuentra el ID
        // y cargar relaciones necesarias con 'with()' para evitar problemas N+1
        $cotizacion = Cotizacion::where('cotizaciones.id', $id)
            ->join('empresas', 'cotizaciones.cot_empresa_id', '=', 'empresas.id')
            ->firstOrFail();
            // El join a empresas ya no es estrictamente necesario si tienes la relación bien definida
            // ->join('empresas', 'cotizaciones.cot_empresa_id', '=', 'empresas.id')
            // ->select('cotizaciones.*', 'empresas.emp_nombre', 'empresas.emp_ruc', 'empresas.emp_direccion', 'empresas.emp_telefono') // Selecciona los campos que necesitas
            // ->firstOrFail(); // Si no se encuentra, lanzará una excepción ModelNotFoundException (404)

        // Si no usas la relación 'empresa' y mantienes el join, tu consulta original estaba bien:
        // $cotizacion = Cotizacion::where('cotizaciones.id', $id)
        //     ->join('empresas', 'cotizaciones.cot_empresa_id', '=', 'empresas.id')
        //     // Asegúrate de seleccionar todos los campos de empresa que necesites
        //     ->select('cotizaciones.*', 'empresas.emp_nombre', 'empresas.emp_ruc', 'empresas.emp_direccion', 'empresas.emp_telefono')
        //     ->firstOrFail();


        // Renderizar la vista Blade a HTML
        // Pasamos la variable $cotizacion a la vista
        $html = view('pdf', compact('cotizacion'))->render();

        // Inicializar mPDF
        // Puedes pasar opciones de configuración al constructor si lo necesitas
        // ej: $mpdf = new Mpdf(['mode' => 'utf-8', 'format' => 'A4-P']);
        $mpdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4', // Formato A4
            'orientation' => 'P', // Orientación Portrait (Vertical). 'L' para Landscape (Horizontal)
            'default_font_size' => 0, // Usa el tamaño de fuente de tu CSS
            'default_font' => '', // Usa la fuente de tu CSS
            'margin_left' => 15,
            'margin_right' => 15,
            'margin_top' => 25, // Margen superior para cabecera si la tienes
            'margin_bottom' => 25, // Margen inferior para pie de página
            'margin_header' => 10,
            'margin_footer' => 10,
        ]);

        // Opcional: Configurar cabecera y pie de página directamente con mPDF
        // $mpdf->SetHeader('Mi Empresa||Reporte de Cotización');
        // $mpdf->SetFooter('Página {PAGENO} de {nb}'); // {PAGENO} y {nb} son placeholders de mPDF

        // Escribir el HTML en el PDF
        $mpdf->WriteHTML($html);

        // Nombre del archivo PDF para la descarga
        $filename = 'cotizacion_' . str_pad($cotizacion->id, 5, '0', STR_PAD_LEFT) . '.pdf';

        // Mostrar el PDF en el navegador (inline)
        // El navegador permitirá al usuario descargarlo o imprimirlo
        // Si quieres forzar la descarga directamente, usa Destination::DOWNLOAD ('D')
        return $mpdf->Output($filename, Destination::INLINE); // 'I' para inline, 'D' para download

        // Si quisieras guardar en el servidor y luego ofrecer un enlace de descarga:
        // $rutaArchivo = storage_path('app/public/cotizaciones/' . $filename);
        // if (!file_exists(storage_path('app/public/cotizaciones'))) {
        //     mkdir(storage_path('app/public/cotizaciones'), 0755, true);
        // }
        // $mpdf->Output($rutaArchivo, Destination::FILE); // 'F' para guardar en archivo
        // return response()->download($rutaArchivo)->deleteFileAfterSend(true);
    }


    public function imprimepdfX($id)
    {
        // Obtener los datos de la cotización
        $cotizacion = Cotizacion::where('cotizaciones.id', $id)
            ->join('empresas', 'cotizaciones.cot_empresa_id', '=', 'empresas.id')
            ->firstOrFail();

        // Inicializar mPDF
        // $mpdf = new \Mpdf\Mpdf();

        $html = view('pdf', compact('cotizacion'))->render();

        $mpdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'margin_left,' => 10,
            'margin_right' => 10,
            'margin_top' => 10,
            'margin_bottom' => 10,
            'margin_header' => 10,
            'margin_footer' => 10,
            'default_font_size' => 12,
        ]);

        $mpdf->writeHTML($html);
        $filename = 'cotizacion_' . $cotizacion->cot_numero . '.pdf';
        return $mpdf->Output($filename, Destination::INLINE);
        // Contenido HTML para el PDF

        // $html = '<bookmark content="Start of the Document" /><div><p>Section 1 text<p>';
        // $html .= "<h1>Cotización</h1>";
        // $html .= "<p>Empresa:  {$cotizacion->emp_nombre } </p>";
        // $html .= "</div>";

        // $mpdf->WriteHTML($html);
        // $mpdf->Output('filename.pdf', \Mpdf\Output\Destination::FILE);

    }


    public function imprime($id)
    {
       
        $cotizaciones = Cotizacion::where('cotizaciones.id', $id)
        ->join('empresas', 'cotizaciones.cot_empresa_id', '=', 'empresas.id')
        ->get();

        $cotdetalles = Cotizaciondetalle::where('cds_cotizacion_id', $id)
        ->join('productos', 'cotizaciondetalles.cds_producto_id', '=', 'productos.id')
        ->get();

        return Inertia::render('Cotizaciones/Imprime', 
        ['cotizaciones' => $cotizaciones,
         'cotdetalles' =>  $cotdetalles]);
    }

      public function imprimepdf2($id){
        $cotizaciones = Cotizacion::where('cotizaciones.id', $id)
        ->join('empresas', 'cotizaciones.cot_empresa_id', '=', 'empresas.id')
        ->first();
        return view('pdf', compact(['$cotizaciones' => 'cotizaciones']));
      }

// SELECT cds_detalle, cds_cantidad, cds_unidadMedida, prd_titulo, prd_detalle  FROM cotizaciondetalles
// JOIN productos ON cds_producto_id = productos.id
// where cds_cotizacion_id = 1   compact([
        //     'cotizaciones',
        //     'cotdetalles'

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {  
        $request-> validate([
            'cot_titulo'=> 'required',
            'cot_empresa_id' => 'required',
            'cot_numero' => 'required',
            'cot_fecha' => 'required',
            'cot_detalle' => 'required|max:200',

        ]);

        Cotizacion::create($request->all());
        return redirect()->back()->with('success', 'Cotizacion creada exitosamente.');
    }

 

    public function update(Request $request, $id)
    {
        $cotizacion = Cotizacion::find($id);
        $cotizacion->fill($request->input())->saveOrFail();
        return redirect()->back()->with('success', 'Cotizacion actualizada correctamente');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $cotizacion = Cotizacion::find($id);
        if (!$cotizacion) {
            return response()->json(['message' => 'Cotizacion no encontrada'], Response::HTTP_NOT_FOUND);
        }
        $cotizacion->delete();

         return redirect()->back()->with('success','Cotizacion eliminada correctamente');
        
    }

    
}