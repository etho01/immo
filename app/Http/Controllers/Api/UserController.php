<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserLoginResources;
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
           return new UserLoginResources(Auth::user());
        }
    }

    public function register(UserRequest $request) {
        User::create([
            'email' => 'test@test.fr',
            'password' => Hash::make('testtest'),
            'name' => 'test',
        ]);
    }
}
