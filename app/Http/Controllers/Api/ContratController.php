<?php

namespace App\Http\Controllers\Api;

use App\Models\Appart;
use App\Models\Contrat;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\contratRequest;
use App\Http\Resources\ContratResouce;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Symfony\Component\HttpFoundation\Response;

class ContratController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $eloquent = Contrat::with([
            'locataire',
            'depotDeGarantie',
            'paiements',
            'etatDesLieus',
            'appart' => [
                'agence'
            ]
        ]);

        if ($request->input('recherche', -1) != -1) {
            $eloquent->whereIn('id', Contrat::getIdByRecherche($request->input('recherche')));
        }

        if ($request->input('agence_id', -1) != -1) {
            $eloquent->whereHas('appart', function (Builder $query) use ($request) {
                $query->where('agence_id', $request->input('agence_id', -1));
            });
        }
        if ($request->input('locataire_id', -1 )!= -1){
            $eloquent->where('locataire_id', $request->input('locataire_id', -1));
        }
        if ($request->input('appart_id', -1) != -1){
            $eloquent->where('appart_id', $request->input('appart_id'));
        }
        return ContratResouce::collection($eloquent->paginate(30));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(contratRequest $request)
    {
        return new ContratResouce (Contrat::create([
            'appart_id' => $request->appart_id,
            'locataire_id' => $request->locataire_id,
            'ref' => $request->ref,
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
        $contrat->date_debut = $request->input('date_debut', $contrat->date_debut);
        $contrat->date_fin = $request->input('date_fin', $contrat->date_fin);
        $contrat->ref = $request->input('ref' , $contrat->ref);

        $contrat->save();
        
        return new ContratResouce($contrat);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contrat $contrat)
    {
        $contrat->delete();
    }
}
