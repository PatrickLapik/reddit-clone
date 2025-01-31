<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\CommunityController;
use App\Http\Controllers\CommunityPostController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserJoinedCommunityController;
use App\Http\Controllers\UserPostController;
use App\Http\Controllers\VoteController;
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

Route::get('/s/{community}', [CommunityController::class, 'show'])->name('community.show');
Route::get('/u/{name}', [ProfileController::class, 'show'])->name('profile');
Route::get('/post/show/{post}', [PostController::class, 'show'])->name('post.show');

Route::get('/s/{community}/post/{post}', [CommunityPostController::class, 'show'])->name('community.post.show');
Route::get('/u/{user}/post/{post}', [UserPostController::class, 'show'])->name('user.post.show');

Route::middleware('auth')->group(function () {
    Route::get('/settings/account', [AccountController::class, 'edit'])->name('settings.account');
    Route::patch('/settings/account', [AccountController::class, 'update'])->name('settings.account.update');
    Route::delete('/settings/account', [AccountController::class, 'destroy'])->name('settings.account.destroy');
    Route::get('/settings/profile', [ProfileController::class, 'index'])->name('settings.profile');

    Route::middleware(['throttle:upload'])->group(function () {
        Route::post('/settings/profile', [ProfileController::class, 'store'])->name('settings.profile.update');
        Route::post('/community/create', [CommunityController::class, 'store'])->name('community.store');
    });
    Route::post('/community/create/unique', [CommunityController::class, 'checkUniqueName'])->name('community.create.validate');
    Route::post('/community/join', [UserJoinedCommunityController::class, 'store'])->name('community.join');
    Route::delete('/community/leave/{id}', [UserJoinedCommunityController::class, 'destroy'])->name('community.leave');

    Route::post('/post/create', [PostController::class, 'store'])->name('post.store');
    Route::get('/post/create', [PostController::class, 'create'])->name('post.create');

    Route::post('/vote', [VoteController::class, 'store'])->name('vote.store');
    Route::patch('/vote', [VoteController::class, 'update'])->name('vote.update');
    Route::delete('/vote/delete/{vote}', [VoteController::class, 'destroy'])->name('vote.destroy');
});


require __DIR__ . '/auth.php';
