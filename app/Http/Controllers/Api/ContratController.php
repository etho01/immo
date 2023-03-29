<?php

namespace App\Http\Controllers\Api;

use App\Models\Appart;
use App\Models\Contrat;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\contratRequest;
use App\Http\Resources\ContratResouce;

class ContratController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ContratResouce::collection(Contrat::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(contratRequest $request)
    {
        return new ContratResouce (Contrat::create([
            'appart_id' => $request->appart_id,
            'locataire_id' => $request->locataire_id,
            'date_debut' => $request->date_debut,
            'date_fin' => $request->date_fin
        ]));
    }

    /**
     * Display the specified resource.
     */
    public function show(Contrat $contrat)
    {
        return new ContratResouce($contrat);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(contratRequest $request, Contrat $contrat)
    {
        Appart::where('id', $contrat->id)->update([
            'appart_id' => $request->appart_id,
            'locataire_id' => $request->locataire_id,
            'date_debut' => $request->date_debut,
            'date_fin' => $request->date_fin
        ]);
        return new ContratResouce(Contrat::find($contrat->id));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contrat $contrat)
    {
        $contrat->delete();
    }
}
