<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
