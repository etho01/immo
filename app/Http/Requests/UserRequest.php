<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
            'password' => ['required', Password::min(3)],
            'name' => ['max:255', 'required'],
            'email' => ['max:255', 'required', 'email']
        ];
    }

    public function update() {
        return [
            'password' => [Password::min(3)],
            'name' => ['max:255'],
            'email' => ['max:255', 'email']
        ];
    }

    public function messages()
    {
        return [
            "password.min" => "Le mot de passe n'est pas assez puissant",
            "password.required" => "Le mot de passe est requis",
            "name.required" => "Le nom est requis",
            "email.required" => "L'email est requis",
            "name.max" => "Le nom est trop grand",
            "email.max" => "L'email est trop grand",
            "email.email" => "L'adresse email doit etre un email"
        ];
    }
}
