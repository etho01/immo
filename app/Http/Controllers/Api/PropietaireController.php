<?php
// doc voir contrat
namespace App\Http\Controllers\api;

use App\Models\Proprietaire;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProprietaireRequest;
use App\Http\Resources\ProprietaireResource;
use Illuminate\Contracts\Database\Eloquent\Builder;

class PropietaireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $elequent = Proprietaire::select('*');
        if ($request->input('recherche', -1) != -1) {
            $elequent->whereIn('id', Proprietaire::getIdByRecherche($request->input('recherche')));
        }
        if ($request->input('genre', "") != "") {
            $elequent->where('genre', $request->input('genre'));
        }
        if ($request->input('appart_id', -1) != -1){
            $elequent->whereHas('apparts', function (Builder $query) use ($request) {
                $query->where('id', $request->input('appart_id'));
            });
        }

        return ProprietaireResource::collection($elequent->paginate(30));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProprietaireRequest $request)
    {
        return new ProprietaireResource(Proprietaire::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'date_naissance' => $request->date_naissance,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'iban' => $request->iban,
            'bic' => $request->bic,
            'genre' => $request->genre,
            'ville' => $request->ville,
            "cp" => $request->cp,
            "adresse" => $request->adresse
        ]));
    }

    /**
     * Display the specified resource.
     */
    public function show(Proprietaire $proprietaire)
    {
        return new ProprietaireResource($proprietaire);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Proprietaire $proprietaire)
    {
        $proprietaire->nom = $request->input('nom', $proprietaire->nom);
        $proprietaire->prenom = $request->input('prenom', $proprietaire->prenom);
        $proprietaire->date_naissance = $request->input('date_naissance', $proprietaire->date_naissance);
        $proprietaire->email = $request->input('email', $proprietaire->email);
        $proprietaire->telephone = $request->input('telephone', $proprietaire->telephone);
        $proprietaire->iban = $request->input('iban', $proprietaire->iban);
        $proprietaire->bic = $request->input('bic', $proprietaire->bic);
        $proprietaire->genre = $request->input('genre', $proprietaire->genre); 
        
        
        $proprietaire->adresse = $request->input('ville', $proprietaire->adresse);
        $proprietaire->cp = $request->input('cp', $proprietaire->cp);
        $proprietaire->ville = $request->input('ville', $proprietaire->ville);

        $proprietaire->save();

        return new ProprietaireResource($proprietaire);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Proprietaire $proprietaire)
    {
        $proprietaire->delete();
    }
}
