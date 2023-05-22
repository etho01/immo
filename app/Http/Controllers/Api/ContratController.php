<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\Appart;
use App\Models\Contrat;
use App\Pdf\QuittancePdf;
use App\Mail\QuittanceMail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\contratRequest;
use App\Http\Resources\ContratResouce;
use App\Http\Requests\QuittanceRequest;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Contracts\Database\Eloquent\Builder;

class ContratController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // permet a eloquent de faire moi de requette, car les relation sont charger qu'une seule fois
        $eloquent = Contrat::with([
            'locataire',
            'depotDeGarantie',
            'paiements',
            'etatDesLieus',
            'appart' => [
                'agence'
            ]
        ]);
        // si le champs recheche est present et non null je filtre les id des contrats correspondant a a la recherche
        if ($request->input('recherche', -1) != -1) {
            $eloquent->whereIn('id', Contrat::getIdByRecherche($request->input('recherche')));
        }

        // si le champs est present et non null je filtre
        if ($request->input('agence_id', -1) != -1) {
            $eloquent->whereHas('appart', function (Builder $query) use ($request) { // permet j'ajouter une condition a une relation ici la relation appart
                $query->where('agence_id', $request->input('agence_id', -1));
            });
        }
        if ($request->input('locataire_id', -1 )!= -1){
            $eloquent->where('locataire_id', $request->input('locataire_id', -1));
        }
        if ($request->input('appart_id', -1) != -1){
            $eloquent->where('appart_id', $request->input('appart_id'));
        }
        // envoie les données du contrats sous la forme d'un json typé (liste de 30 contarts max)
        return ContratResouce::collection($eloquent->paginate(30));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(contratRequest $request)
    {
        // envoie les données du contrat sous la forme d'un json typer
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
        // envoie les données du contrat sous la forme d'un json typer
        return new ContratResouce($contrat);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(contratRequest $request, Contrat $contrat)
    {
        $contrat->date_debut = $request->input('date_debut', $contrat->date_debut); //remplace la nouvelle valeur si elle est presente
        $contrat->date_fin = $request->input('date_fin', $contrat->date_fin);
        $contrat->ref = $request->input('ref' , $contrat->ref);

        $contrat->save(); // sauvegade les changements
        
        return new ContratResouce($contrat);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contrat $contrat)
    {
        // suprime le contrat
        $contrat->delete();
    }

    
    public function downloadQuittance(QuittanceRequest $request, Contrat $contrat) {
        try {
            // get les données neccessaire a la generation de la quittance
            $appart = $contrat->appart;
            $locataire = $contrat->locataire;
            $agence = $appart->agence;
            $proprietaire = $appart->proprietaire;
            $pdf = new QuittancePdf($appart, $contrat, $locataire, $agence, $proprietaire, $request->date_debut, $request->date_fin); // genere le pdf de la quittance
            return $pdf->stream(); // affiche le pdf (sur le front cela va le telecharger)
        } catch (Exception $e) {
            return response([
                'error' => 'error'
            ],422);
        }

    }

    public function sendMailQuittance(QuittanceRequest $request,Contrat $contrat) {
        try {
             // get les données neccessaire a la generation de la quittance
            $appart = $contrat->appart;
            $locataire = $contrat->locataire;
            $agence = $appart->agence;
            $proprietaire = $appart->proprietaire;
            $pdf = new QuittancePdf($appart, $contrat, $locataire, $agence, $proprietaire, $request->date_debut, $request->date_fin);// genere le pdf de la quittance
            Mail::to($locataire->email) // envoie le mail
            ->send(new QuittanceMail($appart, $locataire, $agence, $pdf));
        } catch (Exception $e) {
            return response([
                'error' => 'error'
            ],422);
        }
    }
}
