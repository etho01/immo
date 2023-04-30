<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class ProprietaireRequest extends FormRequest
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
            'nom' => ['required', 'max:255'],
            'prenom' => ['required', 'max:255'],
            'date_naissance' => ['required', 'date'],
            'email' => ['required', 'email', 'max:255'],
            'telephone' => ['required', 'max:255'],
            'iban' => ['required', 'max:255'],
            'bic' => ['required', 'max:255'],
            'genre' => ['required', Rule::in(array_keys(config('constant.SEXE')))],
        ];
    }

    public function update() {
        return [
            'nom' => ['max:255'],
            'prenom' => ['max:255'],
            'date_naissance' => ['date'],
            'email' => ['mail', 'max:255'],
            'telephone' => ['max:255'],
            'iban' => ['max:255'],
            'bic' => ['max:255'],
            'genre' => [Rule::in(array_keys(config('constant.SEXE')))],
        ];
    }
}
