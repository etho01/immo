<?php
// doc principale voir contrat

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

    public static function getPaiementsByDuree($dateDebut, $dateFin, $contrat = null) {
        $eloquent = Paiement::whereBetween('date_paiement', [$dateDebut, $dateFin]);
        if ($contrat != null) {
            $eloquent->where('contrat_id', $contrat);
        }
        return $eloquent->get();
    }


}
