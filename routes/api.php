<?php

use App\Http\Controllers\Api\AgenceController;
use App\Http\Controllers\Api\AppartController;
use App\Http\Controllers\Api\ContratController;
use App\Http\Controllers\Api\DepotDeGarantieController;
use App\Http\Controllers\Api\EtatDesLieuController;
use App\Http\Controllers\Api\LocataireController;
use App\Http\Controllers\Api\PaiementController;
use App\Models\Locataire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::apiResource('agence', AgenceController::class);
Route::apiResource('appart', AppartController::class);
Route::apiResource('contrat', ContratController::class);
Route::apiResource('depotGarantie', DepotDeGarantieController::class);
Route::apiResource('EtatDesLieux', EtatDesLieuController::class);
Route::apiResource('locataire' , LocataireController::class);
Route::apiResource('paiement', PaiementController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
