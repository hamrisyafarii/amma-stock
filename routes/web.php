<?php

use App\Http\Controllers\GudangController;
use App\Http\Controllers\KasirController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LaporanBahanBakuController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('/gudang')->name('gudang.')->group(function () {
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/', [GudangController::class, 'index'])->name('index');
        Route::get('/create', [GudangController::class, 'create'])->name('create');
        Route::post('/', [GudangController::class, 'store'])->name('store');
        Route::get('/{gudang}/edit', [GudangController::class, 'edit'])->name('edit');
        Route::put('/{gudang}', [GudangController::class, 'update'])->name('update');
        Route::delete('/{gudang}', [GudangController::class, 'destroy'])->name('destroy');
        Route::get('/stok/manage', [GudangController::class, 'manageStok'])->name('stok.manage');
        Route::post('/stok/masuk', [GudangController::class, 'stokMasuk'])->name('stok.masuk');
        Route::put('/{gudang}/stok', [GudangController::class, 'updateStok'])->name('stok.update');
    });
});

Route::prefix('/menu')->name('menu.')->group(function () {
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/', [MenuController::class, 'index'])->name('index');
        Route::get('/create', [MenuController::class, 'create'])->name('create');
        Route::get('/{menu}', [MenuController::class, 'edit'])->name('edit');
        Route::put('/{menu}', [MenuController::class, 'update'])->name('update');
        Route::delete('/{menu}', [MenuController::class, 'destroy'])->name('destroy');
        Route::post('/', [MenuController::class, 'store'])->name('store');
    });
});

Route::prefix('/kasir')->name('kasir.')->group(function () {
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/', [KasirController::class, 'index'])->name('index');
        Route::post('/', [KasirController::class, 'store'])->name('store');
    });
});

Route::prefix('/laporan')->name('laporan.')->group(function () {
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/', [LaporanController::class, 'index'])->name('index');
        Route::get('/bahan-baku', [LaporanBahanBakuController::class, 'index'])->name('bahan-baku.index');
    });
});

require __DIR__ . '/auth.php';
