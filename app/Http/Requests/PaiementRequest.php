<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class PaiementRequest extends FormRequest
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
            'contrat_id' => ['required', 'exists:contrats,id'],
            'date_paiement' => ['required', 'date'],
            'montant_paiement' => ['required', 'regex:/^(\d){1,8}(\.(\d){1,2})?$/'],
            'origine' => ['required', Rule::in(array_keys(config('constant.PAIEMENT.ORIGINE')))]
        ];
    }

    public function update() {
        return [
            'date_paiement' => ['date'],
            'contrat_id' => ['exists:contrats,id'],
            'montant_paiement' => ['regex:/^(\d){1,8}(\.(\d){1,2})?$/'],
            'origine' => [Rule::in(array_keys(config('constant.PAIEMENT.ORIGINE')))]
        ];
    }

    public function messages()
    {
        return [
            'contrat_id.required' => "Un contrat est requis pour le paiement",
            "contrat_id.exists" => "le contrat n'exite pas",
            "date_paiement.required" => "La date du paiement est requis",
            "date_paiement.date" => "La date de paiement doit etre une date",
            "montant_paiement.required" => "Le montat du paiement est requis",
            "origine.required" => "L'origine est requis",
            "origine.in" => "L'origine est incorecte",
            "montant_encaisser.regex" => "Le montant du paiement est invalide",
        ];
    }
}
