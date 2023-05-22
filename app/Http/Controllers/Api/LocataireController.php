<?php
// doc voir contrat
namespace App\Http\Controllers\Api;

use Locale;
use App\Models\Locataire;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\LocataireRequest;
use App\Http\Resources\LocataireResouce;
use Illuminate\Contracts\Database\Eloquent\Builder;

class LocataireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $elequent = Locataire::select('*');
        if ($request->input('recherche', -1) != -1) {
            $elequent->whereIn('id', Locataire::getIdByRecherche($request->input('recherche')));
        }
        if ($request->input('genre', "") != "") {
            $elequent->where('genre', $request->input('genre'));
        }
        if ($request->input('contrat_id', -1) != -1){
            $elequent->whereHas('contrats', function (Builder $query) use ($request) {
                $query->where('id', $request->input('contrat_id'));
            });
        }
        return LocataireResouce::collection($elequent->paginate(30));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LocataireRequest $request)
    {
        return new LocataireResouce(Locataire::create([
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
    public function show(Locataire $locataire)
    {
        return new LocataireResouce($locataire);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LocataireRequest $request, Locataire $locataire)
    {
        $locataire->nom = $request->input('nom', $locataire->nom);
        $locataire->prenom = $request->input('prenom', $locataire->prenom);
        $locataire->date_naissance = $request->input('date_naissance', $locataire->date_naissance);
        $locataire->email = $request->input('email', $locataire->email);
        $locataire->telephone = $request->input('telephone', $locataire->telephone);
        $locataire->iban = $request->input('iban', $locataire->iban);
        $locataire->bic = $request->input('bic', $locataire->bic);
        $locataire->genre = $request->input('genre', $locataire->genre);  

        $locataire->adresse = $request->input('ville', $locataire->adresse);
        $locataire->cp = $request->input('cp', $locataire->cp);
        $locataire->ville = $request->input('ville', $locataire->ville);

        $locataire->save();

        return new LocataireResouce($locataire);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Locataire $locataire)
    {
        $locataire->delete();
    }
}
