<?php
// doc soir contrat

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
            'contrat_id' => ['exists:contrats,id'],
            'appart_id' => ['exists:apparts,id'],
            'date' => ['required', 'date'],
            'commentaire' => ['required', 'max:65535'],
            'stade' => ['required', Rule::in(array_keys(config('constant.ETAT_DES_LIEU.STADE')))]
        ];
    }

    public function update() {
        return [
            'date' => ['date'],
            'appart_id' => ['exists:apparts,id'],
            'contrat_id' => ['exists:contrats,id'],
            'stade' => [Rule::in(array_keys(config('constant.ETAT_DES_LIEU.STADE')))],
            'commentaire' => ['max:65535']
        ];
    }

    public function messages()
    {
        return [
            "date.required" => "Une date de l'etat des lieu est neccesaire",
            "date.date" => "La date de l'etat des lieu doit etre un date",
            "commentaire.required" => "L'ajout d'un commentaire est requis",
            "stade.required" => "Le stade de l'etat des lieu est requis",
            'stade.id' => "Le stade n'existe pas",
            "commentaire.max" => "Le commentaire est trop grand",
            "contrat_id.exists" => "Le contrat n'existe pas",
            "appart_id.exists" => "L'appartement n'exite pas"
        ];
    }
}
