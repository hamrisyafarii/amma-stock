<?php

namespace App\Http\Requests\Gudang;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Sesuaikan dengan logika otorisasi Anda jika perlu
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'kuantitas' => 'required|numeric|min:0',
            'satuan' => 'required|string|max:50',
        ];
    }

    /**
     * Get the custom error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'kuantitas.required' => 'Kuantitas stok wajib diisi.',
            'kuantitas.numeric' => 'Kuantitas harus berupa angka.',
            'kuantitas.min' => 'Kuantitas tidak boleh kurang dari :min.',

            'satuan.required' => 'Satuan wajib diisi.',
            'satuan.string' => 'Satuan harus berupa teks.',
            'satuan.max' => 'Satuan maksimal :max karakter.',
        ];
    }
}
