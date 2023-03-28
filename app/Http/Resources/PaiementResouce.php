<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaiementResouce extends JsonResource
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
            'contrat_id' => $this->id,
            'date_paiement' => $this->date_paiement,
            'montant_paiement' => $this->montant_paiement,
            'origine' => $this->origine
        ];
    }
}
