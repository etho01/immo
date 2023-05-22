<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class contratRequest extends FormRequest
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
            'appart_id' => ['required', 'exists:apparts,id'],
            'locataire_id' => ['required', 'exists:locataires,id'],
            'date_debut' => ['required', 'date'],
            'date_fin' => ['date'],
            'ref' => ['required', 'max:255']
        ];
    }

    public function update(){
        return [
            'date_debut' => ['date'],
            'date_fin' => ['date'],
            'appart_id' => ['exists:apparts,id'],
            'locataire_id' => ['exists:locataires,id'],
            'ref' => ['max:255']
        ];
    }

    public function messages()
    {
        return [
            'appart_id.required' => "Il faut renseigner un appartement",
            "locataire_id.required" => "Il faut renseigner un locataire",
            "date_debut.required" => "Il fait renseigner la date de debut du contrat",
            "ref.required" => "La referance du contrat est requis",
            "date_debut.date" => "La date de debut du contrat n'est pas une date",
            "date_fin.date" => "La date de fin du contrat n'est pas une date",
            "appart_id.exists" => "L'appartment n'exite pas",
            "locataire_id.exists" => "Le locataire n'existe pas",
            "ref.max" => "La referance est trop grand"
        ];
    }

}
