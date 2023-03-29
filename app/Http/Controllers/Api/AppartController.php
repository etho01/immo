<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\appart\storeRequest;
use App\Http\Requests\appartRequest;
use App\Http\Resources\AppartResouce;
use App\Models\Appart;
use Illuminate\Http\Request;

class AppartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AppartResouce::collection(Appart::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(appartRequest $request)
    {
        return new AppartResouce( Appart::create([
            'agence_id' => $request->agence_id,
            'adresse' => $request->adresse,
            'adresse_compl' => $request->adresse_compl,
            'cp' => $request->cp,
            'pays' => $request->pays,
            'charge' => $request->charge,
            'loyer' => $request->loyer
        ]));
    }

    /**
     * Display the specified resource.
     */
    public function show(Appart $appart)
    {
        return new AppartResouce($appart);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Appart $appart)
    {
        Appart::where('id', $appart->id)->update([
            'agence_id' => $request->agence_id,
            'adresse' => $request->adresse,
            'adresse_compl' => $request->adresse_compl,
            'cp' => $request->cp,
            'pays' => $request->pays,
            'charge' => $request->charge,
            'loyer' => $request->loyer
        ]);
        return new AppartResouce(Appart::find($appart->id));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appart $appart)
    {
        $appart->delete();
    }
}
