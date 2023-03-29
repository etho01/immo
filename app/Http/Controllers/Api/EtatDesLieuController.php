<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EtatDesLieuResouce;
use App\Models\EtatDesLieu;
use Illuminate\Http\Request;

class EtatDesLieuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return EtatDesLieuResouce::collection(EtatDesLieu::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
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
    public function update(Request $request, EtatDesLieu $etatDesLieu)
    {
        EtatDesLieu::where('id', $etatDesLieu->id)->update([
            'contrat_id' => $request->contrat_id,
            'appart_id' => $request->appart_id,
            'date' => $request->date,
            'commentaire' => $request->commentaire,
            'stade' => $request->stade
        ]);
        return new EtatDesLieuResouce(EtatDesLieu::find($etatDesLieu->id));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EtatDesLieu $etatDesLieu)
    {
        $etatDesLieu->delete();
    }
}
