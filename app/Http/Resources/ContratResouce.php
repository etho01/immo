<?php

namespace App\Http\Resources;

use App\Models\Appart;
use App\Models\DepotDeGarantie;
use App\Models\EtatDesLieu;
use App\Models\Locataire;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContratResouce extends JsonResource
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
            'appart' => new AppartResouce($this->appart),
            'locataire' => new LocataireResouce($this->locataire),
            'depot_de_garantie' => DepotDeGarantieResouce::collection($this->depotDeGaranties),
            'etat_des_lieu' => EtatDesLieuResouce::collection($this->etatDesLieus),
            'paiement' => PaiementResouce::collection($this->paiements),
            'date_debut' => $this->date_debut,
            'date_fin' => $this->date_fin
        ];
    }
}
