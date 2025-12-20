<?php

namespace App\Http\Controllers;

use App\Models\Gudang;
use App\Models\StokMutasi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaporanBahanBakuController extends Controller
{
    public function index(Request $request)
    {
        $tanggalMulai = $request->input('tanggal_mulai', now()->startOfMonth()->toDateString());
        $tanggalSelesai = $request->input('tanggal_selesai', now()->endOfMonth()->toDateString());

        $daftarGudang = Gudang::with(['stokMutasis' => function ($query) use ($tanggalMulai, $tanggalSelesai) {
            $query->whereBetween('tanggal', [$tanggalMulai, $tanggalSelesai]);
        }])->get();

        $laporan = $daftarGudang->map(function ($gudang) use ($tanggalMulai) {
            $stokAwalMasuk = $gudang->stokMutasis()
                ->where('tipe', 'masuk')
                ->where('tanggal', '<', $tanggalMulai)
                ->sum('kuantitas');

            $stokAwalKeluar = $gudang->stokMutasis()
                ->where('tipe', 'keluar')
                ->where('tanggal', '<', $tanggalMulai)
                ->sum('kuantitas');

            $stokAwal = $stokAwalMasuk - $stokAwalKeluar;

            $stokMasuk = $gudang->stokMutasis->where('tipe', 'masuk')->sum('kuantitas');
            $stokKeluar = $gudang->stokMutasis->where('tipe', 'keluar')->sum('kuantitas');

            return [
                'id' => $gudang->id,
                'nama' => $gudang->nama,
                'satuan' => $gudang->satuan,
                'stok_awal' => $stokAwal,
                'stok_masuk' => $stokMasuk,
                'stok_keluar' => $stokKeluar,
                'stok_akhir' => $stokAwal + $stokMasuk - $stokKeluar,
            ];
        });

        return Inertia::render('LaporanBahanBaku/List', [
            'laporan' => $laporan,
            'filters' => $request->only(['tanggal_mulai', 'tanggal_selesai']),
        ]);
    }
}
