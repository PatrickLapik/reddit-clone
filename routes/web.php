<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\CommentController;
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

Route::get('/', [PostController::class, 'index'])->name('home');

Route::get('/s/{community}/post/{post}', [CommunityPostController::class, 'show'])->name('community.post.show');
Route::get('/u/{user}/post/{post}', [UserPostController::class, 'show'])->name('user.post.show');

Route::middleware('auth')->group(function () {
    Route::controller(AccountController::class)->name('settings.')->prefix('settings')->group(function () {
        Route::get('/account', 'edit')->name('account');
        Route::patch('/account', 'update')->name('account.update');
        Route::delete('/account', 'destroy')->name('account.destroy');
        Route::get('/profile', 'index')->name('profile');
    });
    Route::middleware(['throttle:upload'])->group(function () {
        Route::post('/settings/profile', [ProfileController::class, 'store'])->name('settings.profile.update');
        Route::post('/community/create', [CommunityController::class, 'store'])->name('community.store');
    });
    Route::controller(UserJoinedCommunityController::class)->name('community.')->prefix('community')->group(function () {
        Route::post('/join', 'store')->name('join');
        Route::delete('/leave/{id}', 'destroy')->name('leave');
    });
    Route::post('/community/create/unique', [CommunityController::class, 'checkUniqueName'])->name('community.create.validate');
    Route::controller(PostController::class)->name('post.')->prefix('post')->group(function () {
        Route::resource('post', PostController::class);
        Route::post('/create', 'store')->name('store');
        Route::get('/create', 'create')->name('create');
        Route::patch('/update/{post}', 'update')->name('update');
        Route::delete('/delete/{post}', 'destroy')->name('destroy');
    });
    Route::controller(CommentController::class)->name('comment.')->group(function () {
        Route::post('/post/{post}/comment/{comment?}', 'store')->name('store');
        Route::post('/comment/update/{comment}', 'update')->name('update');
        Route::delete('/comment/delete/{comment}', 'destroy')->name('destroy');
    });
    Route::controller(VoteController::class)->name('vote.')->prefix('vote')->group(function () {
        Route::post('/create', 'store')->name('store');
        Route::patch('/update/{vote}', 'update')->name('update');
        Route::delete('/delete/{vote}', 'destroy')->name('destroy');
    });
});


require __DIR__ . '/auth.php';
