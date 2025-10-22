<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::orderByDesc('created_at')->get());
    }

    public function show(string $id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);
        $validated = $request->validate([
            'email' => 'sometimes|email|unique:users,email,' . $user->id . ',id',
            'role' => 'sometimes|in:admin,user',
            'full_name' => 'sometimes|nullable|string',
            'phone' => 'sometimes|nullable|string',
            'password' => 'sometimes|string|min:6',
        ]);
        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }
        $user->update($validated);
        return response()->json($user);
    }

    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'Deleted']);
    }

    public function stats()
    {
        return response()->json([
            'total' => User::count(),
            'admin' => User::where('role', 'admin')->count(),
            'user' => User::where('role', 'user')->count(),
        ]);
    }

    public function search(Request $request)
    {
        $keyword = $request->query('keyword');
        if (!$keyword) return response()->json([]);
        $q = "%{$keyword}%";
        return response()->json(
            User::where('email', 'like', $q)
                ->orWhere('full_name', 'like', $q)
                ->orderByDesc('created_at')
                ->get()
        );
    }
}
