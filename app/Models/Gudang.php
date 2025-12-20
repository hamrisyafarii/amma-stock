<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gudang extends Model
{
    use HasFactory;

    protected $table = 'gudangs';

    protected $fillable = [
        'nama',
        'satuan',
        'kuantitas',
    ];

    public function menu()
    {
        return $this->belongsToMany(Menu::class, 'menu_gudang')->withPivot('jumlah_bahan')->withTimestamps();
    }

    public function stokMutasis()
    {
        return $this->hasMany(StokMutasi::class);
    }
}
