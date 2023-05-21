<?php

namespace App\Models;

use App\Mail\PaiementMail;
use App\Mail\QuittanceMail;
use App\Pdf\QuittancePdf;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;

class Paiement extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'contrat_id',
        'date_paiement',
        'montant_paiement',
        'origine',
        'created_at',
        'updated_at'
    ];

    public function contrat(){
        return $this->belongsTo(Contrat::class);
    }

    public static function getSumPaiyerForPeriode($dateDebut, $dateFin, $contrat = null) {
        $eloquent = Paiement::whereBetween('date_paiement', [$dateDebut, $dateFin]);
        if ($contrat != null) {
            $eloquent->where('contrat_id', $contrat);
        }
        return $eloquent->sum('montant_paiement');
    }

    public function GenerateQuittance() {

        $contrat = $this->contrat;
        $appart = $contrat->appart;

        new QuittancePdf($this, $appart, $contrat);

        if (Paiement::getSumPaiyerForPeriode('1991-03-01', '1992-03-01', $contrat->id) >= $appart->getSumForPeriode('1991-03-01', '1992-03-01')) {
            Mail::to('test@test.fr')->send(new QuittanceMail($this, $appart, $contrat));
            return true;
        }
        return false;
    }

}
