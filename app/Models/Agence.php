<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agence extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'nom',
        'iban',
        'bic',
        'created_at',
        'updated_at'
    ];

    public function apparts(){
        return $this->hasMany(Appart::class);
    }

    public static function getIdByRecherche($recherche) {
        $eloquent = Agence::select('id');
        $eloquent->orWhere('nom', 'like', '%'.$recherche.'%');
        $eloquent->orWhere('iban', 'like', '%'.$recherche.'%');
        $eloquent->orWhere('bic', 'like', '%'.$recherche.'%');
        return ($eloquent->get()->pluck('id'));
    }
}
