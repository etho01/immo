<?php
// doc principale voir contrat

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

    public function appart(){
        return $this->belongsTo(Appart::class);
    }

    public function contrat(){
        return $this->belongsTo(Contrat::class);
    }
}
