<?php
// doc principale voir contrat

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proprietaire extends Model
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

    public function apparts(){
        return $this->hasMany(Appart::class);
    }

    public static function getIdByRecherche($recherche) {
        $eloquent = Proprietaire::select('id');
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
