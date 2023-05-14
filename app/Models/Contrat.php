<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use League\CommonMark\Extension\CommonMark\Node\Inline\Code;

class Contrat extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'appart_id',
        'locataire_id',
        'date_debut',
        'date_fin', 
        'ref',
        'created_at',
        'updated_at'
    ];

    public function appart(){
        return $this->hasOne(Appart::class, 'id');
    }

    public function paiements(){
        return $this->hasMany(Paiement::class);
    }

    public function etatDesLieus(){
        return $this->hasMany(EtatDesLieu::class);
    }

    public function depotDeGarantie(){
        return $this->hasOne(DepotDeGarantie::class);
    }

    public function locataire(){
        return $this->belongsTo(Locataire::class, 'locataire_id', 'id', 'id', 'id');
    }

    public static function getIdByRecherche($recherche) {
        $eloquent = Contrat::select('id');
        $eloquent->orWhere('ref', 'like', '%'.$recherche.'%');

        $eloquent->orWhereIn('appart_id', Appart::getIdByRecherche($recherche));
        $eloquent->orWhereIn('locataire_id', Locataire::getIdByRecherche($recherche));

        return ($eloquent->get()->pluck('id'));
    }
}
