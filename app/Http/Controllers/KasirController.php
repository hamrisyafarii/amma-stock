<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use App\Models\Menu;
use App\Models\StokMutasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class KasirController extends Controller
{
    public function index()
    {
        $daftarMenu = Menu::with('gudang')->get();

        $daftarMenu->each(function ($menu) {
            $menu->ready = $menu->gudang->every(function ($gudang) {
                $stokAkhir = $gudang->stokMutasis()
                    ->selectRaw('COALESCE(SUM(CASE WHEN tipe = "masuk" THEN kuantitas ELSE 0 END) - SUM(CASE WHEN tipe = "keluar" THEN kuantitas ELSE 0 END), 0) as stok_akhir')
                    ->value('stok_akhir');

                return $stokAkhir >= $gudang->pivot->jumlah_bahan;
            });
        });

        return Inertia::render('Kasir/List', [
            'daftarMenu' => $daftarMenu,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:menu,id',
            'items.*.qty' => 'required|integer|min:1',
        ]);

        DB::transaction(function () use ($validated) {
            foreach ($validated['items'] as $item) {
                $menu = Menu::with('gudang')->findOrFail($item['id']);

                foreach ($menu->gudang as $gudang) {
                    $jumlahBahan = $gudang->pivot->jumlah_bahan;
                    $totalDipakai = $jumlahBahan * $item['qty'];

                    // Buat catatan stok keluar
                    StokMutasi::create([
                        'gudang_id' => $gudang->id,
                        'tipe' => 'keluar',
                        'kuantitas' => $totalDipakai,
                        'keterangan' => "Terpakai untuk menu: {$menu->nama}",
                        'tanggal' => now()->toDateString(),
                    ]);
                }

                Laporan::create([
                    'menu_id' => $menu->id,
                    'qty' => $item['qty'],
                    'total_harga' => $menu->harga * $item['qty'],
                    'tanggal' => now()->toDateString(),
                ]);
            }
        });

        return back()->with('success', 'Pesanan berhasil diproses dan stok diperbarui.');
    }
}
