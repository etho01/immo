<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DepotDeGarantieRequest extends FormRequest
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

    function store() {
        return [
            'contrat_id' => ['required', 'exists:contrats,id', 'unique:etat_des_lieus,contrat_id'],
            'montant_encaisser' => ['required'],
            "date_encaissement" => ['required', 'date'],
            'montant_restituer' => [],
            'date_restitution' => ['date']
        ];
    }

    function update() {
        return [
            'contrat_id' => ['exists:contrats,id'],
            "date_encaissement" => ['date'],
            'montant_restituer' => [],
            'date_restitution' => ['date']
        ];
    }
    
    public function messages()
    {
        return [
            "contrat_id.required" => "Il faut renseinger un contrat",
            "contrat_id.exists" => "Le contrat n'existe pas",
            "contrat_id.unique" => "Le contrat a deja un depot de garantie",
            "montant_encaisser.required" => "Le montant encaisser ne soit pas etre null",
            "date_encaissement.required" => "La date d'encaissement du depot de garantie est requis",
            "date_encaissement.date" => "La date d'encaissement doit etre une date",
            "date_restitution.date" => "La date de restitution du depot de garantie doit etre une date"
        ];
    }
}
