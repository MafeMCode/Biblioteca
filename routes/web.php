<?php

use Domain\Stats\Actions\bookStatsAction;
use Domain\Stats\Actions\userStatsAction;
use Domain\Stats\Actions\zoneStatsAction;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('stats', function (userStatsAction $action1, bookStatsAction $action2, zoneStatsAction $action3) {
        $userdata = $action1();
        $bookdata = $action2();
        $zonedata = $action3();
        return Inertia::render('stats', ['userdata' => $userdata, 'bookdata' => $bookdata, 'zonedata' => $zonedata]);
    })->name('stats');
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource('users', \App\Users\Controllers\UserController::class);
    Route::resource('userUI', \App\UserUI\Controllers\UserUIController::class);
    Route::resource('floors', \App\Floors\Controllers\FloorController::class);
    Route::resource('zones', \App\Zones\Controllers\ZoneController::class);
    Route::resource('bookcases', \App\Bookcases\Controllers\BookcaseController::class);
    Route::resource('books', \App\Books\Controllers\BookController::class);
    Route::resource('loans', \App\Loans\Controllers\LoanController::class);
    Route::resource('reservations', \App\Reservations\Controllers\ReservationController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
