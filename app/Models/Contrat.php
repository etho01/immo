<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
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

    public function getSolde() {
        return (DB::select('select 
        (
            (ROUND (DATEDIFF(
                    (
                        
                        CASE WHEN c.date_fin > now() 
                        THEN now() ELSE c.date_fin END 
                    )
                , c.date_debut) /30) 
                    + 
                    CASE WHEN c.date_fin > NOW() THEN 0 ELSE 1 END
                )
                *
                ( a.charge + a.loyer) 
        ) - 
        (
            SELECT SUM(p.montant_paiement) from paiements p 
            where p.contrat_id = c.id
        ) AS VALUE
             
        from contrats c
        JOIN apparts a on c.appart_id = a.id
        where c.id = '. $this->id
        )[0]->VALUE);
    }

    public function del() {
        foreach ($this->paiements as $paiement ) {
            $paiement->del();
        }
        foreach ($this->etatDesLieus as $etatDesLieu ) {
            $etatDesLieu->del();
        }
        if ($this->depotDeGarantie != null) $this->depotDeGarantie->del();
        $this->delete();
    }

    public static function getContratSoldeSuffistant() {
        $tab_data = (DB::select('
        select c.id
        from contrats c
        JOIN apparts a on c.appart_id = a.id
        where 
            (
            (ROUND (DATEDIFF(
                     (
                          
                         CASE WHEN c.date_fin > now() 
                         THEN now() ELSE c.date_fin END 
                     )
                 , c.date_debut) /30) )
                 *
                 ( a.charge + a.loyer) 
        ) - 
        (
            SELECT SUM(p.montant_paiement) from paiements p 
            where p.contrat_id = c.id
        ) <= 0'));
        $tab_resp = [];
        foreach ($tab_data as $data) {
            $tab_resp[] = $data->id;
        }
        return ($tab_resp);
    }
}
