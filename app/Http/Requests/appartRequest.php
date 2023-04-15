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
           'agence_id' => ['required'],
            'adresse' => ['required'],
            'adresse_compl' => ['required'],
            'cp' => ['required'],
            'pays' => ['required'],
            'charge' => ['required'],
            'loyer' => ['required']
        ];
    }

    public function update(){
        return [];
    }

    public function destroy(){
        return [];
    }
}
