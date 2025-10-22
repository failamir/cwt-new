<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\JobController;
use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Auth (token-based)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});

// Jobs (public reads)
Route::get('/jobs', [JobController::class, 'index']);
Route::get('/jobs/urgent', [JobController::class, 'urgent']);
Route::get('/jobs/active', [JobController::class, 'active']);
Route::get('/jobs/search', [JobController::class, 'search']);
Route::get('/jobs/{id}', [JobController::class, 'show']);

// Jobs admin management
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/jobs', [JobController::class, 'store']);
    Route::patch('/jobs/{id}', [JobController::class, 'update']);
    Route::delete('/jobs/{id}', [JobController::class, 'destroy']);
});

// Applications
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/applications', [ApplicationController::class, 'store']);
    Route::get('/applications/{id}', [ApplicationController::class, 'show']);
    Route::patch('/applications/{id}', [ApplicationController::class, 'update']);
    Route::delete('/applications/{id}', [ApplicationController::class, 'delete']);
    Route::get('/applications/by-user/{userId}', [ApplicationController::class, 'byUser']);
    // by-job is useful for admin dashboards, keep auth required
    Route::get('/applications/by-job/{jobId}', [ApplicationController::class, 'byJob']);
});

// Applications admin endpoints
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/applications', [ApplicationController::class, 'index']);
    Route::get('/applications/stats', [ApplicationController::class, 'stats']);
    Route::patch('/applications/{id}/status', [ApplicationController::class, 'updateStatus']);
});

// Users admin
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/stats', [UserController::class, 'stats']);
    Route::get('/users/search', [UserController::class, 'search']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::patch('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
