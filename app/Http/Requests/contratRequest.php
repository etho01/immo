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
            'appart_id' => ['required'],
            'locataire_id' => ['required'],
            'date_debut' => ['required', 'date'],
            'date_fin' => ['required', 'date'],
        ];
    }

    public function update(){
        return [
            'date_debut' => ['date'],
            'date_fin' => ['date']
        ];
    }

}
