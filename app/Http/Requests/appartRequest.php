<?php

namespace App\Http\Requests;

use Illuminate\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class appartRequest extends FormRequest
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

    public function store(){
        return [
           'agence_id' => ['required', 'exists:agences,id'],
            'adresse' => ['required', 'max:255'],
            'adresse_compl' => ['required', 'max:255'],
            'departement' => ['required', 'max:255'],
            'cp' => ['required', 'max:255'],
            'pays' => ['required', 'max:255'],
            'charge' => ['required', 'decimal:0;2'],
            'loyer' => ['required', 'decimal:0;2'],
            'proprietaire_id' => ['required', 'exists:proprietaires,id']
        ];
    }

    public function update(){
        return [
            'charge' => ['decimal:0;2'],
            'loyer' => ['decimal:0;2'],
            'adresse_compl' => ['max:255'],
            'departement' => ['max:255'],
            'cp' => ['max:255'],
            'pays' => ['max:255'],
            'adresse' => ['max:255'],
            'agence_id' => ['exists:agences,id'],
            'proprietaire_id' => ['exists:proprietaires,id']
        ];
    }

    public function destroy(){
        return [];
    }
}
