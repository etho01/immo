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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EtatDesLieu $etatDesLieu)
    {
        //
    }
}
