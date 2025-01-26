<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\CommunityController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/r/{community}', [CommunityController::class, 'show'])->name('community');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/settings/account', [AccountController::class, 'edit'])->name('settings.account');
    Route::patch('/settings/account', [AccountController::class, 'update'])->name('settings.account.update');
    Route::delete('/settings/account', [AccountController::class, 'destroy'])->name('settings.account.destroy');
    Route::get('/settings/profile', [ProfileController::class, 'index'])->name('settings.profile');
    Route::middleware(['throttle:upload'])->group(function() {
        Route::post('/settings/profile', [ProfileController::class, 'store'])->name('settings.profile.update');

    });
});

require __DIR__.'/auth.php';
