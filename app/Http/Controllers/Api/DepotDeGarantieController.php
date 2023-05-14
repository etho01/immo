<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\DepotDeGarantie;
use App\Http\Controllers\Controller;
use App\Http\Requests\DepotDeGarantieRequest;
use App\Http\Resources\DepotDeGarantieResouce;

class DepotDeGarantieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $eloquent = DepotDeGarantie::select('*');
        if ($request->input('contrat_id', -1) != -1){
            $eloquent->where('contrat_id', $request->input('contrat_id'));
        }
        return DepotDeGarantieResouce::collection($eloquent->paginate(30));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DepotDeGarantieRequest $request)
    {
        DepotDeGarantie::create([
            'contrat_id' => $request->contrat_id,
            'montant_encaisser' => $request->montant_encaisser,
            'date_encaissement' => $request->date_encaissement,
            'montant_restituer' => $request->montant_restituer, 
            'date_restitution' => $request->date_restitution
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
    public function update(DepotDeGarantieRequest $request, DepotDeGarantie $depotDeGarantie)
    {
        $depotDeGarantie->montant_encaisser = $request->input('montant_encaisser', $depotDeGarantie->montant_encaisser);
        $depotDeGarantie->date_encaissement = $request->input('date_encaissement', $depotDeGarantie->date_encaissement);
        $depotDeGarantie->montant_restituer = $request->input('montant_restituer', $depotDeGarantie->montant_restituer);
        $depotDeGarantie->date_restitution = $request->input('date_restitution', $depotDeGarantie->date_restitution);

        $depotDeGarantie->save();

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
