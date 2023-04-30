<?php

namespace App\Http\Resources;

use App\Models\User;
use App\Models\Agence;
use App\Models\Proprietaire;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppartResouce extends JsonResource
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
            'agence' => new AgenceResouce($this->agence),
            'adresse' => $this->adresse,
            'adresse_compl' => $this->adresse_compl,
            'departement' => $this->departement,
            'cp' => $this->cp,
            'pays' => $this->pays,
            'charge' => $this->charge,
            'loyer' => $this->loyer,
            'proprietaire' => new ProprietaireResource($this->proprietaire)
        ];
    }
}
