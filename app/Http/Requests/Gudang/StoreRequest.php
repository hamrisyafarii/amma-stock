<?php

namespace App\Http\Requests\Gudang;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama' => 'string|max:255',
            'satuan' => 'string',
            'kuantitas' => 'numeric|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'nama.string' => 'Nama gudang harus berupa teks.',
            'nama.max' => 'Nama gudang maksimal :max karakter.',

            'kuantitas.numeric' => 'Kuantitas harus berupa angka.',
            'kuantitas.min' => 'Kuantitas minimal :min.',
        ];
    }
}
