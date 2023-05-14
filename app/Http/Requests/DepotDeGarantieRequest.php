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
            'contrat_id' => ['required', 'exists:contrats,id'],
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
}
