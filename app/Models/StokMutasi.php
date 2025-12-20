<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StokMutasi extends Model
{
    use HasFactory;

    protected $fillable = [
        'gudang_id',
        'tipe',
        'kuantitas',
        'keterangan',
        'tanggal',
    ];

    public function gudang()
    {
        return $this->belongsTo(Gudang::class);
    }
}
