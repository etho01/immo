<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EtatDesLieuResouce extends JsonResource
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
            'appart_id' => $this->appart_id,
            'date' => $this->date,
            'commentaire' => $this->commentaire,
            'stade' => $this->stade
        ];
    }
}
