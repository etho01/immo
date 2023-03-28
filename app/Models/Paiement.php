<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'contrat_id',
        'date_paiement',
        'montant_paiement',
        'origine',
        'created_at',
        'updated_at'
    ];

}
