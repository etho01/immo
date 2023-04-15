<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LocataireRequest extends FormRequest
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
            'nom' => ['required'],
            'prenom' => ['required'],
            'date_naissance' => ['required', 'date'],
            'email' => ['required', 'mail'],
            'telephone' => ['required'],
            'iban' => ['required'],
            'bic' => ['required'],
            'genre' => ['required'],
        ];
    }

    public function update() {
        return [
            'date_naissance' => ['date'],
            'email' => ['mail']
        ];
    }
}
