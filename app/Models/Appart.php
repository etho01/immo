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
        'pays',
        'charge',
        'loyer',
        'created_at',
        'updated_at'
    ];

    public function agence(){
        return $this->belongsTo(Agence::class);
    }

}
