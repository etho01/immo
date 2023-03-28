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

}
