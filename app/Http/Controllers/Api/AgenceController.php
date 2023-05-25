<?php
// doc voir contrat
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AgenceRequest;
use App\Http\Resources\AgenceResouce;
use App\Models\Agence;
use Illuminate\Http\Request;

class AgenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $eloquent = Agence::select('*');
        if ($request->input('recherche', -1) != -1) {
            $eloquent->whereIn('id', Agence::getIdByRecherche($request->input('recherche')));
        }
        return AgenceResouce::collection($eloquent->paginate(30));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AgenceRequest $request)
    {
        return new AgenceResouce(Agence::create([
            'nom' => $request->nom,
            'iban' => $request->iban,
            'bic' => $request->bic,
        ]));
    }

    /**
     * Display the specified resource.
     */
    public function show(Agence $agence)
    {
        return new AgenceResouce($agence);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AgenceRequest $request, Agence $agence)
    {
        $agence->nom = $request->input('nom', $agence->nom);
        $agence->iban = $request->input('iban', $agence->iban);
        $agence->bic = $request->input('bic', $agence->bic);

        $agence->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Agence $agence)
    {
        $agence->del();
    }
}
