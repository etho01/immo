<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AgenceRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return match($this->method()){
            'POST' => $this->store(),
            'PUT', 'PATCH' => $this->update(),
        };
    }

    public function store() {
        return [
            'nom' => ['required', 'max:255', 'unique:agences,nom'],
            'iban' => ['required', 'max:255'],
            'bic' => ['required', 'max:255'],
        ];
    }

    public function update() {
        return [
            'nom' => ['max:255', 'unique:agences,nom'],
            'iban' => ['max:255'],
            'bic' => ['max:255'],
        ];
    }

    public function messages()
    {
        return [
            'nom.required' => 'le nom de l\'agence est requis',
            'iban.required' => "l'iban de l'agence est requis",
            "bic.required" => "le bic de l'agence est requis",
            'nom.max' => 'le nom de l\'agence est trop grand',
            'iban.max' => "l'iban de l'agence est trop grand",
            "bic.max" => "le bic de l'agence est trop grand",
            'nom.unique' => "Le nom de l'agence existe deja"
        ];
    }
}
