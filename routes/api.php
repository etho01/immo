<?php

use App\Models\Locataire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\UserApiIsValid;
use App\Http\Middleware\UserTokenIsValide;
use App\Http\Controllers\api\UserController;
use App\Http\Controllers\Api\AgenceController;
use App\Http\Controllers\Api\AppartController;
use App\Http\Controllers\Api\ContratController;
use App\Http\Controllers\Api\PaiementController;
use App\Http\Controllers\Api\LocataireController;
use App\Http\Controllers\Api\EtatDesLieuController;
use App\Http\Controllers\Api\DepotDeGarantieController;
use App\Http\Controllers\api\PropietaireController;

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

Route::get('login', [UserController::class, 'connect']);
Route::get('register', [UserController::class, 'register']);

Route::get('/login/error', function () {
    return response()->json([
        'message' => 'Not authenticated'
       ],401);
})->name('login');

//Route::middleware('auth:sanctum')->group(function() {
    Route::apiResource('agence', AgenceController::class);
    Route::apiResource('appart', AppartController::class);
    Route::apiResource('contrat', ContratController::class);
    Route::apiResource('depotGarantie', DepotDeGarantieController::class);
    Route::apiResource('etatDesLieux', EtatDesLieuController::class);
    Route::apiResource('locataire' , LocataireController::class);
    Route::apiResource('paiement', PaiementController::class);
    Route::apiResource('proprietaire', PropietaireController::class);
    Route::apiResource('user', UserController::class);
//});