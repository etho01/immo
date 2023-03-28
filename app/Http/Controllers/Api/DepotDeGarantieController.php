<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DepotDeGarantieResouce;
use App\Models\DepotDeGarantie;
use Illuminate\Http\Request;

class DepotDeGarantieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DepotDeGarantieResouce::collection(DepotDeGarantie::all());
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
    public function show(DepotDeGarantie $depotDeGarantie)
    {
        return new DepotDeGarantieResouce($depotDeGarantie);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DepotDeGarantie $depotDeGarantie)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DepotDeGarantie $depotDeGarantie)
    {
        //
    }
}
