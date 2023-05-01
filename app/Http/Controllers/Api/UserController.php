<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserLoginResources;
use App\Http\Resources\UserResource;
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

    public function index(Request $request) {
        return UserResource::collection(User::paginate(30));
    }

    public function store(UserRequest $request){
        return new UserResource(User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'name' => $request->name
        ]));
    }

    public function show(User $user) {
        return new UserResource($user);
    }

    public function update (UserRequest $request, User $user){
        $user->name = $request->input('name', $user->name);
        if ($request->input('password', '') != ''){
            $user->password = Hash::make($request->input('password'));
        }
        $user->email = $request->input('email', $user->email);

        $user->save();
    }

    public function destroy(User $user){
        $user->delete();
    }
}
