<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class EtatDesLieuRequest extends FormRequest
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
            'appart_id' => ['required', 'exists:apparts,id'],
            'date' => ['required', 'date'],
            'commentaire' => ['required'],
            'stade' => ['required', Rule::in(array_keys(config('constant.ETAT_DES_LIEU.STADE')))]
        ];
    }

    public function update() {
        return [
            'date' => ['date'],
            'appart_id' => ['exists:apparts,id'],
            'contrat_id' => ['exists:contrats,id'],
            'stade' => [Rule::in(array_keys(config('constant.ETAT_DES_LIEU.STADE')))]
        ];
    }
}
