<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PaiementResouce;
use App\Models\Paiement;
use Illuminate\Http\Request;

class PaiementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $eloquent = Paiement::select('*');
        if ($request->input('contrat_id', -1) != -1){
            $request->where('contrat_id', $request->input('contrat_id'));
        }
        return PaiementResouce::collection($eloquent->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return new PaiementResouce(Paiement::create([
            'contrat_id' => $request->contrat_id,
            'date_paiement' => $request->date_paiement,
            'montant_paiement' => $request->montant_paiement,
            'origine' => $request->origine
        ]));
    }

    /**
     * Display the specified resource.
     */
    public function show(Paiement $paiement)
    {
        return new PaiementResouce($paiement);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Paiement $paiement)
    {
        Paiement::where('id', $paiement->id)->update([
            'contrat_id' => $request->contrat_id,
            'date_paiement' => $request->date_paiement,
            'montant_paiement' => $request->montant_paiement,
            'origine' => $request->origine
        ]);
        return new PaiementResouce(Paiement::find($paiement->id));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paiement $paiement)
    {
        $paiement->delete();
    }
}
