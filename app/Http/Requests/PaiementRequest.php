<?php

namespace App\Http\Requests;

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
            'contrat_id' => ['required'],
            'date_paiement' => ['required', 'date'],
            'montant_paiement' => ['required', 'decimal:0;2'],
            'origine' => ['required']
        ];
    }

    public function update() {
        return [
            'date_paiement' => ['date'],
            'montant_paiement' => ['decimal:0;2'],
        ];
    }
}
