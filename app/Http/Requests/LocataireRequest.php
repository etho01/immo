<?php
// doc soir contrat

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class LocataireRequest extends FormRequest
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
            'nom' => ['required', 'max:255'],
            'prenom' => ['required', 'max:255'],
            'date_naissance' => ['required', 'date'],
            'email' => ['required', 'email', 'max:255'],
            'telephone' => ['required', 'max:255'],
            'iban' => ['required', 'max:255'],
            'bic' => ['required', 'max:255'],
            'genre' => ['required', Rule::in(array_keys(config('constant.SEXE')))],
        ];
    }

    public function update() {
        return [
            'nom' => ['max:255'],
            'prenom' => ['max:255'],
            'date_naissance' => ['date'],
            'email' => ['email', 'max:255'],
            'telephone' => ['max:255'],
            'iban' => ['max:255'],
            'bic' => ['max:255'],
            'genre' => [Rule::in(array_keys(config('constant.SEXE')))],
        ];
    }

    public function messages()
    {
        return [
            'nom.required' => "Le nom de locataire est requis",
            "prenom.requied" => "Le prenom du locataire est requis",
            "date_naissance.required" => "La date de naissance est requis",
            "email.requied" => "L'adresse email du locataire est requis",
            "telephone.requied" =>  "Le numero de telephone du locataire est requis",
            "iban.required" => "Le champs iban est requis",
            "bic.requied" => "Le champs bic est requis",
            "genre.required" => "Le genre du locataire est requis",
            'nom.max' => "Le nom du locataire est trop long",
            "prenom.max" => "Le prenom du locataire est trop long",
            "date_naissance.date" => "La date de naissance du locataire doit etre une date",
            "email.email" => "Le champs email doit etre une adresse email valide",
            "email.max" => "L'adresse email est trop longue",
            "telephone.max" => "Le numero de telephone est trop long",
            "iban.max" => "L'iban est trop long",
            "bic.max" => "Le champs bic est trop long",
            "genre.in" => "Le grenre n'exite pas"
        ];
    }
}
