<?php

namespace App\Http\Controllers;

use App\Models\Gudang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GudangController extends Controller
{
    public function index()
    {
        $daftarGudang = Gudang::all();

        return Inertia::render('Gudang/List', [
            'daftarGudang' => $daftarGudang,
        ]);
    }

    public function create()
    {
        return Inertia::render('Gudang/Add');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255|unique:gudangs',
        ]);

        Gudang::create($validated);

        return redirect()
            ->route('gudang.index')
            ->with('success', 'Bahan baku berhasil ditambahkan. Silakan atur stoknya.');
    }

    public function edit(Gudang $gudang)
    {
        return Inertia::render('Gudang/Update', [
            'gudang' => $gudang
        ]);
    }

    public function update(Request $request, Gudang $gudang)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255|unique:gudangs,nama,' . $gudang->id,
        ]);

        $gudang->update($validated);

        return redirect()->route('gudang.index')->with('success', 'Nama bahan baku berhasil diperbarui.');
    }

    public function manageStok()
    {
        $daftarGudang = Gudang::with('stokMutasis')->get();

        return Inertia::render('Gudang/ManageStok', [
            'daftarGudang' => $daftarGudang,
        ]);
    }


    public function stokMasuk(Request $request)
    {
        $validated = $request->validate([
            'gudang_id' => 'required|exists:gudangs,id',
            'kuantitas' => 'required|numeric|min:1',
            'satuan' => 'required|string|max:50',
        ]);

        $gudang = Gudang::findOrFail($validated['gudang_id']);

        if (!$gudang->satuan) {
            $gudang->update([
                'satuan' => $validated['satuan'],
            ]);
        }

        $gudang->stokMutasis()->create([
            'tipe' => 'masuk',
            'kuantitas' => $validated['kuantitas'],
            'keterangan' => $validated['satuan'],
            'tanggal' => now()->toDateString(),
        ]);

        return redirect()
            ->route('gudang.stok.manage')
            ->with('success', 'Stok berhasil ditambahkan.');
    }

    public function updateStok(Request $request, Gudang $gudang)
    {
        $validated = $request->validate([
            'kuantitas' => 'required|numeric|min:0',
            'satuan' => 'required|string|max:50',
        ]);

        $gudang->update($validated);

        $gudang->stokMutasis()->create([
            'tipe' => 'masuk',
            'kuantitas' => $validated['kuantitas'],
            'keterangan' => 'Stok awal diatur',
            'tanggal' => now()->toDateString(),
        ]);

        return redirect()->route('gudang.stok.manage')->with('success', 'Stok berhasil diperbarui.');
    }

    public function destroy(Gudang $gudang)
    {
        $gudang->delete();

        return redirect()->route('gudang.index');
    }
}
