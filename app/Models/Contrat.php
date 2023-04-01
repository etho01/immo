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
        'created_at',
        'updated_at'
    ];

    public function appart(){
        return $this->belongsTo(Appart::class, 'appart_id');
    }

    public function paiements(){
        return $this->hasMany(Paiement::class);
    }

    public function etatDesLieus(){
        return $this->hasMany(EtatDesLieu::class);
    }

    public function depotDeGaranties(){
        return $this->hasMany(DepotDeGarantie::class);
    }

    public function locataire(){
        return $this->belongsTo(Locataire::class, 'locataire_id');
    }

    public static function rq($col = '*'){
        return Contrat::select($col);
    } 

    public static function filtreAgence($rq, $agence_id){
        return $rq->whereIn('appart_id', Appart::filtreAgence(Appart::rq('id'), $agence_id));
    }
}
