<?php

namespace App\Pdf;

use App\Models\Agence;
use App\Models\Appart;
use App\Models\Contrat;
use App\Models\Locataire;
use App\Models\Paiement;
use PDF;

class QuittancePdf {

    public function __construct(
        Appart $appart,
        Contrat $contrat,
        Locataire $locataire,
        Agence $agence
    ) {
        $this->pdf = PDF::loadView('pdf.quittance', compact('appart', 'contrat', 'locataire', 'agence'));
    }

    public function stream(){
        return $this->pdf->stream();
    }
    
}
