<?php

namespace App\Http\Requests;
// doc soir contrat

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
            'adresse_compl' => ['max:255'],
            'departement' => ['required', 'max:255'],
            'cp' => ['required', 'max:255'],
            'pays' => ['required', 'max:255'],
            'charge' => ['required', 'regex:/^(\d){1,8}(\.(\d){1,2})?$/'],
            'loyer' => ['required', 'regex:/^(\d){1,8}(\.(\d){1,2})?$/'],
            'proprietaire_id' => ['required', 'exists:proprietaires,id'],
            'ville' => ['max:255', 'required']
        ];
    }

    public function update(){
        return [

            'adresse_compl' => ['max:255'],
            'departement' => ['max:255'],
            'cp' => ['max:255'],
            'pays' => ['max:255'],
            'charge' => ['regex:/^(\d){1,8}(\.(\d){1,2})?$/'],
            'loyer' => ['regex:/^(\d){1,8}(\.(\d){1,2})?$/'],
            'adresse' => ['max:255'],
            'agence_id' => ['exists:agences,id'],
            'proprietaire_id' => ['exists:proprietaires,id'],
            'ville' => ['max:255']
        ];
    }

    public function destroy(){
        return [];
    }

    public function messages()
    {
        return [
            'agence_id.required' => "Il faut renseigner un contrat",
            'adresse.requird' => "une adresse est requis",
            'departement.required' => "Un departement est requis",
            'cp.required' => "un code postal est requis",
            'pays.required' => 'Un pays est requis',
            "charge.required" => "Un motant de charge est requis",
            "loyer.required" => "Un montant de loyer est requis",
            "proprietaire_id.required" => "Il faut renseigner un appartement",
            'adresse_compl.max' => "Le champs adresse complementaire est trop grand",
            'departement.max' => "Le champs departement est trop grand",
            'cp.max' => "Le champs code postal est trop grand",
            'pays.max' => "Le champs pays est trop grand",
            'adresse.max' => "Le champs adresse est trop grand",
            "proprietaire_id.exists" => "Le propretaire n'existe pas",
            "agence_id.exists" => "L'agence n'existe pas",
            "charge.regex" => "Le montant des charges est invalide",
            "loyer.regex" => "Le montant du loyer est invalide",
            "ville.max" => "Le nom de la ville est trop grand",
            "ville.required" => "La ville est requis"
        ];
    }
}
