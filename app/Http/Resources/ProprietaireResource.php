<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProprietaireResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nom' => $this->nom,
            'prenom' => $this->prenom,
            'date_naissance' => $this->date_naissance,
            'email' => $this->email,
            'telephone' => $this->telephone,
            'iban' => $this->iban,
            'bic' => $this->bic,
            'genre' => $this->genre,
            'ville' => $this->ville,
            "cp" => $this->cp,
            "adresse" => $this->adresse
        ];
    }
}
