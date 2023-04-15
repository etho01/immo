<?php

namespace App\Http\Requests;

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
            'contrat_id' => ['required'],
            'appart_id' => ['required'],
            'date' => ['required', 'date'],
            'commentaire' => ['required'],
            'stade' => ['required']
        ];
    }

    public function update() {
        return [
            'date' => ['date']
        ];
    }
}
