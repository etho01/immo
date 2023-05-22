<?php
// doc principale voir contrat
namespace App\Models;

use Carbon\Carbon;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appart extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'agence_id',
        'adresse',
        'adresse_compl',
        'cp',
        'departement',
        'pays',
        'charge',
        'loyer',
        'ville',
        'proprietaire_id',
        'created_at',
        'updated_at'
    ];

    
    public static function getIdByRecherche($recherche) {
        $eloquent = Appart::select('id');
        $eloquent->orWhere('adresse', 'like', '%'.$recherche.'%');
        $eloquent->orWhere('adresse_compl', 'like', '%'.$recherche.'%');
        $eloquent->orWhere('cp', 'like', '%'.$recherche.'%');
        $eloquent->orWhere('departement', 'like', '%'.$recherche.'%');
        $eloquent->orWhere('pays', 'like', '%'.$recherche.'%');

        $eloquent->orWhereIn('proprietaire_id', Proprietaire::getIdByRecherche($recherche));
        $eloquent->orWhereIn('agence_id', Agence::getIdByRecherche($recherche));

        return ($eloquent->get()->pluck('id'));
    }

    public function getSumForPeriode($date_debut, $date_fin) {
        return ($this->charge + $this->loyer) * $this->getNbMois($date_debut, $date_fin);
    }

    public function getNbMois($date_debut, $date_fin){
        $dateFin = Carbon::parse($date_fin);
        $dateDebut = Carbon::parse($date_debut);
        return $dateDebut->diffInMonths($dateFin) + 1;
    }

    public function getAdresse() {
        return $this->adresse. ' '. $this->cp. ' ' . $this->ville;
    }

    public function agence(){
        return $this->belongsTo(Agence::class);
    }

    public function etatDesLieus(){
        return $this->hasMany(EtatDesLieu::class);
    }

    public function contrats(){
        return $this->hasMany(Contrat::class);
    }

    public static function rq($col = '*'){
        return Appart::select($col);
    } 

    public static function filtreAgence($rq, $agence_id){
        return $rq->where('agence_id', $agence_id);
    }

    public function proprietaire(){
        return $this->belongsTo(Proprietaire::class);
    }

}
