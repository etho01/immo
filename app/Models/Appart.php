<?php

namespace App\Models;

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
        'proprietaire_id',
        'created_at',
        'updated_at'
    ];

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
