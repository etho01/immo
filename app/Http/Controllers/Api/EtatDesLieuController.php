<?php
// doc voir contrat
namespace App\Http\Controllers\Api;

use App\Models\EtatDesLieu;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\EtatDesLieuRequest;
use App\Http\Resources\EtatDesLieuResouce;

class EtatDesLieuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $eloquent = EtatDesLieu::select('*');
        if ($request->input('contrat_id', -1) != -1){
            $eloquent->where('contrat_id', $request->input('contrat_id'));
        }
        if ($request->input('appart_id', -1) != -1){
            $eloquent->where('appart_id', $request->input('appart_id')); 
        }
        return EtatDesLieuResouce::collection($eloquent->paginate(30));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EtatDesLieuRequest $request)
    {
        return new EtatDesLieuResouce(EtatDesLieu::create([
            'contrat_id' => $request->contrat_id,
            'appart_id' => $request->appart_id,
            'date' => $request->date,
            'commentaire' => $request->commentaire,
            'stade' => $request->stade
        ]));
    }

    /**
     * Display the specified resource.
     */
    public function show(EtatDesLieu $etatDesLieu)
    {
        return new EtatDesLieuResouce($etatDesLieu);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EtatDesLieuRequest $request, EtatDesLieu $etatDesLieu)
    {
        $etatDesLieu = EtatDesLieu::find($request->etatDesLieux);

        $etatDesLieu->date = $request->input('date', $etatDesLieu->date);
        $etatDesLieu->commentaire = $request->input('commentaire', $etatDesLieu->commentaire);
        $etatDesLieu->stade = $request->input('stade', $etatDesLieu->stade);

        $etatDesLieu->save();

        return new EtatDesLieuResouce($etatDesLieu);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, EtatDesLieu $etatDesLieu)
    {
        $etatDesLieu = EtatDesLieu::find($request->etatDesLieux);

        $etatDesLieu->delete();
    }
}
