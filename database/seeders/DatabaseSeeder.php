<?php

namespace Database\Seeders;

use App\Models\User;
 use App\Models\Empresa;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       
         Empresa::factory()->create([
            'emp_nombre' => 'EMPRESA DE PRUEBAS SAS',
            'emp_direccion' => 'Avenida nacional # 55 - 22',
            'emp_ciudad' => 'Santa Lucía',
            'emp_tipodoc' => 'N',
            'emp_telefono'=> '3150205689',
            'emp_nrodoc' => '9800545221',
            'emp_fchini' => '2025-04-01',
            'emp_email' => 'test@com.co',
            'emp_logo' => 'logo.png',
            'emp_nrocotizacion' => '0',
            'emp_estado' => 'A',
         ]);

        User::factory()->create([
            'name' => 'Administrador para pruebas',
            'email' => 'admin@com.co',
            'empresa_id' => 1,
            'password' => 'Admin123',
            'role' => 'super'
        
        ]);
    }
}
