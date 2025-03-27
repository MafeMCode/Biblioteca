<?php

use App\Books\Controllers\Api\BookApiController;
use App\Http\Controllers\Api\UserApiController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/users', [UserApiController::class, 'index']);
    Route::get('/users/{user}', [UserApiController::class, 'show']);
    Route::post('/users', [UserApiController::class, 'store']);
    Route::put('/users/{user}', [UserApiController::class, 'update']);
    Route::delete('/users/{user}', [UserApiController::class, 'destroy']);
});

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/books', [BookApiController::class, 'index']);
    Route::get('/books/{book}', [BookApiController::class, 'show']);
    Route::post('/books', [BookApiController::class, 'store']);
    Route::put('/books/{book}', [BookApiController::class, 'update']);
    Route::delete('/books/{book}', [BookApiController::class, 'destroy']);
});
