<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('users', \App\Users\Controllers\UserController::class);
    Route::resource('floors', \App\Floors\Controllers\FloorController::class);
    Route::resource('zones', \App\Floors\Controllers\FloorController::class);
    Route::resource('bookcases', \App\Floors\Controllers\FloorController::class);
    Route::resource('books', \App\Floors\Controllers\FloorController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
