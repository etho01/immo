<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserApiIsValid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $user = User::findOrFail($request->user_id);
            dd($user->tokens);
            if ($user->tokens->where('token', $request->token)->count() == 0) return $this->getErrorMessage();
            return $next($request);
        } catch (Exception $e) {
            return $this->getErrorMessage();
        }
    }

    public function getErrorMessage(){
        return response()->json([
            'message' => 'Not authenticated'
           ],401);
    }
}
