<?php

use App\Bookcases\Controllers\Api\BookcaseApiController;
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

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/bookcases', [BookcaseApiController::class, 'index']);
    Route::get('/bookcases/{bookcase}', [BookcaseApiController::class, 'show']);
    Route::post('/bookcases', [BookcaseApiController::class, 'store']);
    Route::put('/bookcases/{bookcase}', [BookcaseApiController::class, 'update']);
    Route::delete('/bookcases/{bookcase}', [BookcaseApiController::class, 'destroy']);
});
