<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EtatDesLieu extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'contrat_id',
        'appart_id',
        'date',
        'commentaire',
        'stade',
        'created_at',
        'updated_at'
    ];
}
