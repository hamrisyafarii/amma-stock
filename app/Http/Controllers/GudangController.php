<?php

namespace App\Http\Controllers;

use App\Models\Gudang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GudangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $daftarGudang = Gudang::all();

        return Inertia::render('Gudang/List', [
            'daftarGudang' => $daftarGudang,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Gudang/Add');
    }

    /**
     * Store a newly created resource in storage.
     * Method ini hanya untuk membuat master bahan baku (nama saja).
     */
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

    /**
     * Show the form for editing the specified resource.
     * Method ini akan menampilkan form untuk mengatur stok (kuantitas & satuan).
     */
    public function edit(Gudang $gudang)
    {
        return Inertia::render('Gudang/Update', [
            'gudang' => $gudang
        ]);
    }

    /**
     * Update the specified resource's name in storage.
     */
    public function update(Request $request, Gudang $gudang)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255|unique:gudangs,nama,' . $gudang->id,
        ]);

        $gudang->update($validated);

        return redirect()->route('gudang.index')->with('success', 'Nama bahan baku berhasil diperbarui.');
    }

    /**
     * Display the stock management page.
     */
    public function manageStok()
    {
        $daftarGudang = Gudang::all();
        return Inertia::render('Gudang/ManageStok', [
            'daftarGudang' => $daftarGudang,
        ]);
    }

    /**
     * Update the stock for a specific item.
     */
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gudang $gudang)
    {
        $gudang->delete();

        return redirect()->route('gudang.index');
    }
}
