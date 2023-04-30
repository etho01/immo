<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\appart\storeRequest;
use App\Http\Requests\appartRequest;
use App\Http\Resources\AppartResouce;
use App\Models\Appart;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class AppartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $eloquent = Appart::with([
            'agence',
        ]);
        if ($request->input('contrat_id', -1) != -1){
            $request->whereHas('contrats', function (Builder $query) use ($request){
                $query->where('id', $request->input('contrat_id'));
            });
        }
        if ($request->input('proprietaire_id' , -1) != -1){
            $eloquent->where('proprietaire_id', $request->input('proprietaire_id'));
        }

        return AppartResouce::collection($eloquent->paginate(30));
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
            'loyer' => $request->loyer,
            'proprietaire_id' => $request->proprietaire_id
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
    public function update(appartRequest $request, Appart $appart)
    {
        $appart->agence_id = $request->input('agence_id', $appart->agence_id);
        $appart->adresse= $request->input('adresse', $appart->adresse);
        $appart->adresse_compl = $request->input('adresse_compl', $appart->adresse_compl);
        $appart->cp = $request->input('cp', $appart->cp);
        $appart->pays = $request->input('pays', $appart->pays);
        $appart->charge =$request->input('charge', $appart->charge);
        $appart->loyer = $request->input('loyer', $appart->loyer);
        $appart->proprietaire_id = $request->input('proprietaire_id', $appart->proprietaire_id);

        $appart->save();

        return new AppartResouce($appart);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appart $appart)
    {
        $appart->delete();
    }
}
