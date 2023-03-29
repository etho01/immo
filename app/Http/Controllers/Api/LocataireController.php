<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LocataireResouce;
use App\Models\Locataire;
use Illuminate\Http\Request;
use Locale;

class LocataireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return LocataireResouce::collection(Locataire::all());
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
