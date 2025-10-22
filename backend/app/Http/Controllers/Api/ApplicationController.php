<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function index()
    {
        // Admin: list all
        return response()->json(
            Application::with(['job', 'user'])->orderByDesc('created_at')->get()
        );
    }

    public function show(string $id)
    {
        $app = Application::with(['job', 'user'])->findOrFail($id);
        return response()->json($app);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_id' => 'required|uuid|exists:jobs,id',
            'user_id' => 'required|uuid|exists:users,id',
            'personal_details' => 'nullable|array',
            'pre_screening' => 'nullable|array',
            'screening' => 'nullable|array',
        ]);

        // Ensure a user can only create their own application unless admin
        if ($request->user()->role !== 'admin' && $validated['user_id'] !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        // Enforce unique(job_id,user_id)
        if (Application::where('job_id', $validated['job_id'])->where('user_id', $validated['user_id'])->exists()) {
            return response()->json(['message' => 'Already applied'], 422);
        }

        $app = Application::create([
            'job_id' => $validated['job_id'],
            'user_id' => $validated['user_id'],
            'status' => 'pending',
            'personal_details' => $validated['personal_details'] ?? null,
            'pre_screening' => $validated['pre_screening'] ?? null,
            'screening' => $validated['screening'] ?? null,
        ]);

        return response()->json($app->load(['job', 'user']), 201);
    }

    public function update(Request $request, string $id)
    {
        $app = Application::findOrFail($id);

        // Only admin or the owner can update non-status fields
        if ($request->user()->role !== 'admin' && $app->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $validated = $request->validate([
            'personal_details' => 'sometimes|array|nullable',
            'pre_screening' => 'sometimes|array|nullable',
            'screening' => 'sometimes|array|nullable',
        ]);

        $app->update($validated);
        return response()->json($app->fresh(['job', 'user']));
    }

    public function updateStatus(Request $request, string $id)
    {
        // Admin only
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $validated = $request->validate([
            'status' => 'required|in:pending,shortlisted,approved,rejected'
        ]);

        $app = Application::findOrFail($id);
        $app->update(['status' => $validated['status']]);
        return response()->json($app->fresh(['job', 'user']));
    }

    public function delete(string $id)
    {
        $app = Application::findOrFail($id);
        // Admin or owner can delete
        if (request()->user()->role !== 'admin' && $app->user_id !== request()->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        $app->delete();
        return response()->json(['message' => 'Deleted']);
    }

    public function byUser(Request $request, string $userId)
    {
        if ($request->user()->role !== 'admin' && $request->user()->id !== $userId) {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        return response()->json(
            Application::with(['job'])->where('user_id', $userId)->orderByDesc('created_at')->get()
        );
    }

    public function byJob(string $jobId)
    {
        return response()->json(
            Application::with(['user'])->where('job_id', $jobId)->orderByDesc('created_at')->get()
        );
    }

    public function stats()
    {
        $total = Application::count();
        $pending = Application::where('status', 'pending')->count();
        $approved = Application::where('status', 'approved')->count();
        $rejected = Application::where('status', 'rejected')->count();
        $shortlisted = Application::where('status', 'shortlisted')->count();
        return response()->json([
            'total' => $total,
            'pending' => $pending,
            'approved' => $approved,
            'rejected' => $rejected,
            'shortlisted' => $shortlisted,
        ]);
    }
}
