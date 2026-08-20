<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AuthController extends Controller
{
    function index() {
        return Inertia::render('Login');
    }

    function login(Request $request) {
        $credentials = $request->validate([
            "email" => ["required", "email"],
            "password" => "required",
        ]);

        if (Auth::attempt($credentials, $request->boolean("remember", false))) {
            $request->session()->regenerate();
            return redirect()->intended('dashboard');
        }

        throw ValidationException::withMessages([
            'email' => 'Email atau password yang anda masukkan salah!'
        ]);
    }

    function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('login');
    }
}
