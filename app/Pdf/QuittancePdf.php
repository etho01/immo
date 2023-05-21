<?php

namespace App\Pdf;

use App\Models\Agence;
use App\Models\Appart;
use App\Models\Contrat;
use App\Models\Locataire;
use App\Models\Paiement;
use App\Models\Proprietaire;
use Exception;
use PDF;

class QuittancePdf {

    public function __construct(
        Appart $appart,
        Contrat $contrat,
        Locataire $locataire,
        Agence $agence,
        Proprietaire $proprietaire,
        $date_debut,
        $date_fin
    ) {
        $paiements = Paiement::getPaiementsByDuree($date_debut, $date_fin, $contrat->id);
        $sommeDu = $appart->getSumForPeriode($date_debut, $date_fin);
        $nbMois = $appart->getNbMois($date_debut, $date_fin);
        if ($paiements->sum('montant_paiement') < $appart->getSumForPeriode($date_debut, $date_fin)) {
            throw new Exception('');
        }
        $this->pdf = PDF::loadView('pdf.quittance', compact(
            'appart', 
            'contrat', 
            'locataire', 
            'agence', 
            'proprietaire', 
            'date_debut', 
            'date_fin', 
            'paiements',
            'sommeDu',
            'nbMois'
        ));
    }

    public function stream(){
        return $this->pdf->stream();
    }
    
}
