<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Locataire extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'nom',
        'prenom',
        'date_naissance',
        'email',
        'telephone',
        'iban',
        'bic',
        'genre',
        'created_at',
        'updated_at'
    ];

    public function contrats(){
        return $this->hasMany(Contrat::class);
    }

    public static function getIdByRecherche($recherche) {
        $eloquent = Locataire::select('id');
        $eloquent->orWhere('nom', 'like', '%'.$recherche.'%');
        $eloquent->orWhere('prenom', 'like', '%'.$recherche.'%');
        $eloquent->orWhere('email', 'like', '%'.$recherche.'%');
        $eloquent->orWhere('telephone', 'like', '%'.$recherche.'%');
        return ($eloquent->get()->pluck('id'));
    }

    public function getNom() {
        return $this->prenom . ' ' . $this->nom;
    }

}
