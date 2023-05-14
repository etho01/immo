<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DepotDeGarantieResouce extends JsonResource
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
            'contrat_id' => $this->contrat_id,
            'montant_encaisser' => $this->montant_encaisser,
            'date_encaissement' => $this->date_encaissement,
            'montant_restituer' => $this->montant_restituer,
            'date_restitution' => $this->date_restitution
        ];
    }
}
