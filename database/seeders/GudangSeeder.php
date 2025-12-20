<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GudangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('gudangs')->insert([
            [
                'nama' => 'Beras Premium',
                'kuantitas' => 100,
                'satuan' => 'kg',
            ],
            [
                'nama' => 'Gula Pasir',
                'kuantitas' => 50,
                'satuan' => 'kg',
            ],
            [
                'nama' => 'Minyak Goreng',
                'kuantitas' => 200,
                'satuan' => 'liter',
            ],
            [
                'nama' => 'Tepung Terigu',
                'kuantitas' => 75,
                'satuan' => 'kg',
            ],
        ]);
    }
}
