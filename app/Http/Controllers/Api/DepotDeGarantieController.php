<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DepotDeGarantieResouce;
use App\Models\DepotDeGarantie;
use Illuminate\Http\Request;

class DepotDeGarantieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DepotDeGarantieResouce::collection(DepotDeGarantie::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DepotDeGarantie::create([
            'contrat_id' => $request->contrat_id,
            'montant_encaisser' => $request->montant_encaisser,
            'date_encaissement' => $request->date_encaissement,
            'montant_restituer' => $request->montant_restituer, 
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(DepotDeGarantie $depotDeGarantie)
    {
        return new DepotDeGarantieResouce($depotDeGarantie);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DepotDeGarantie $depotDeGarantie)
    {
        DepotDeGarantie::where('id', $depotDeGarantie->id)->update([
            'contrat_id' => $request->contrat_id,
            'montant_encaisser' => $request->montant_encaisser,
            'date_encaissement' => $request->date_encaissement,
            'montant_restituer' => $request->montant_restituer, 
        ]);
        return new DepotDeGarantieResouce(DepotDeGarantie::find($depotDeGarantie->id));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DepotDeGarantie $depotDeGarantie)
    {
        $depotDeGarantie->delete();
    }
}
