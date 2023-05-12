<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\api\UserController;

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
    return route('dashboard');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');//->middleware(['auth', 'verified']);
//require __DIR__.'/auth.php';


Route::view('{any}', 'dashboard')
  //  ->middleware('auth')
    ->where('any', '.*');