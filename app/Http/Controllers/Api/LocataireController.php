<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LocataireResouce;
use App\Models\Locataire;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Locale;

class LocataireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $elequent = Locataire::select('*');
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
    public function store(Request $request)
    {
        return new LocataireResouce(Locataire::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'date_naissance' => $request->date_naissance,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'iban' => $request->iban,
            'bic' => $request->bic,
            'genre' => $request->genre
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
    public function update(Request $request, Locataire $locataire)
    {
        Locataire::where('id', $locataire->id)->update([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'date_naissance' => $request->date_naissance,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'iban' => $request->iban,
            'bic' => $request->bic,
            'genre' => $request->genre
        ]);
        return new LocataireResouce(Locataire::find($locataire->id));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Locataire $locataire)
    {
        //
    }
}
