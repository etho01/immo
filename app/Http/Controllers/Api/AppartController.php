<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Appart $appart)
    {
        return $appart->toJson();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Appart $appart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appart $appart)
    {
        //
    }
}
