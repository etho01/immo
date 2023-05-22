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
            'appart' => new AppartResouce(Appart::find( $this->appart_id)),
            'locataire' => new LocataireResouce($this->locataire),
            'depot_de_garantie' => new DepotDeGarantieResouce($this->depotDeGarantie),
            'etat_des_lieu' => EtatDesLieuResouce::collection($this->etatDesLieus),
            'paiement' => PaiementResouce::collection($this->paiements),
            'ref' => $this->ref,
            'date_debut' => $this->date_debut,
            'date_fin' => $this->date_fin,
            'solde' => $this->getSolde()
        ];
    }
}
