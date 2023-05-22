<?php

namespace App\Http\Controllers\Api;
// doc voir contrat
use App\Models\Paiement;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\PaiementRequest;
use App\Http\Resources\PaiementResouce;
use App\Pdf\QuittancePdf;
use Exception;

class PaiementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $eloquent = Paiement::select('*');
        if ($request->input('contrat_id', -1) != -1){
            $eloquent->where('contrat_id', $request->input('contrat_id'));
        }
        return PaiementResouce::collection($eloquent->paginate(30));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PaiementRequest $request)
    {
        $newPaiement = Paiement::create([
            'contrat_id' => $request->contrat_id,
            'date_paiement' => $request->date_paiement,
            'montant_paiement' => $request->montant_paiement,
            'origine' => $request->origine,
            'methode' => $request->methode
        ]);

        return new PaiementResouce($newPaiement);
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
    public function update(PaiementRequest $request, Paiement $paiement)
    {
        $paiement->date_paiement = $request->input('date_paiement', $paiement->date_paiement);
        $paiement->montant_paiement = $request->input('montant_paiement', $paiement->montant_paiement);
        $paiement->origine = $request->input('origine', $paiement->origine);
        $paiement->methode = $request->input('methode', $paiement->methode);

        $paiement->save();

        return new PaiementResouce($paiement);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paiement $paiement)
    {
        $paiement->delete();
    }

}
