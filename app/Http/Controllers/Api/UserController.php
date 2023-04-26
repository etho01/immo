<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function connect(Request $request) {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
 
        if (Auth::attempt($credentials)) {
           $token = $request->user()->createToken('auth2');

           return ['token' => $token->plainTextToken];
        }
    }

    public function register(UserRequest $request) {
        User::create([
            'email' => $request->email,
            'password' => Hash::make($request->input('password')),
            'name' => 'test',
        ]);
    }
}
