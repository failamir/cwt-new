<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $query = Job::query();
        if ($department = $request->query('department')) {
            $query->where('department', $department);
        }
        return response()->json($query->orderByDesc('created_at')->get());
    }

    public function show(string $id)
    {
        $job = Job::findOrFail($id);
        return response()->json($job);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'department' => 'required|in:deck,hotel,engine',
            'company' => 'required|string',
            'location' => 'required|string',
            'urgent' => 'boolean',
            'date_posted' => 'required|date',
            'expiration_date' => 'required|date',
            'experience' => 'required|string|max:100',
            'gender' => 'required|in:any,male,female',
            'requirements' => 'required|array',
            'requirements.*' => 'string',
            'salary' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $job = Job::create($validated);
        return response()->json($job, 201);
    }

    public function update(Request $request, string $id)
    {
        $job = Job::findOrFail($id);
        $validated = $request->validate([
            'title' => 'sometimes|string',
            'department' => 'sometimes|in:deck,hotel,engine',
            'company' => 'sometimes|string',
            'location' => 'sometimes|string',
            'urgent' => 'sometimes|boolean',
            'date_posted' => 'sometimes|date',
            'expiration_date' => 'sometimes|date',
            'experience' => 'sometimes|string|max:100',
            'gender' => 'sometimes|in:any,male,female',
            'requirements' => 'sometimes|array',
            'requirements.*' => 'string',
            'salary' => 'nullable|string',
            'description' => 'nullable|string',
        ]);
        $job->update($validated);
        return response()->json($job);
    }

    public function destroy(string $id)
    {
        $job = Job::findOrFail($id);
        $job->delete();
        return response()->json(['message' => 'Deleted']);
    }

    public function urgent()
    {
        return response()->json(Job::where('urgent', true)->orderByDesc('created_at')->get());
    }

    public function active()
    {
        return response()->json(Job::whereDate('expiration_date', '>=', now()->toDateString())->orderByDesc('created_at')->get());
    }

    public function search(Request $request)
    {
        $keyword = $request->query('keyword');
        if (!$keyword) return response()->json([]);
        $q = "%{$keyword}%";
        return response()->json(
            Job::where('title', 'like', $q)
                ->orWhere('company', 'like', $q)
                ->orWhere('location', 'like', $q)
                ->orderByDesc('created_at')
                ->get()
        );
    }
}
