<?php

use App\Http\Controllers\Api\AppartController;
use App\Models\Appart;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', [AppartController::class, 'store']);

Route::view('{any}', 'welcome')
    ->where('any', '.*');