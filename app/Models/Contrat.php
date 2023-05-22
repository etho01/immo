<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use League\CommonMark\Extension\CommonMark\Node\Inline\Code;

class Contrat extends Model
{
    use HasFactory;
    // set les valeurs modifiables
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

    public function appart(){ // set la relation l'appartement (c'est une fonction mais a l'utilisation c'est une variable de classe)
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
        $eloquent = Contrat::select('id'); // select la liste des id des contrats correspodant aus recherche
        $eloquent->orWhere('ref', 'like', '%'.$recherche.'%'); // like sur la col ref

        $eloquent->orWhereIn('appart_id', Appart::getIdByRecherche($recherche)); // fais un in avec les id des appart correspondant a la recherche
        $eloquent->orWhereIn('locataire_id', Locataire::getIdByRecherche($recherche));

        return ($eloquent->get()->pluck('id')); // convertie la collecion (passe d'une collection de model de contrat a celle de l'id du contrat)
    }
}
