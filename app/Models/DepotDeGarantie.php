<?php
// doc principale voir contrat

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DepotDeGarantie extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'contrat_id',
        'montant_encaisser',
        'date_encaissement',
        'montant_restituer',
        'date_restitution',
        'created_at',
        'updated_at'
    ];

    public function contrat(){
        return $this->belongsTo(Contrat::class);
    }

}