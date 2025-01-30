<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Settings/Profile');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProfileUpdateRequest $request)
    {
        $path = $request->file('avatar')->store('avatars', ['disk' => 'public']);
        $publicPath = Storage::url($path);

        $user = $request->user();
        $user->avatar = $publicPath;
        $user->save();

        return back()->with('success', 'New Avatar Uploaded!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $name)
    {
        $profile = User::where('name', $name)
            ->select('id', 'name', 'avatar')
            ->with(['posts' => function ($query) {
                $query->select('id', 'user_id', 'title', 'body', 'created_at')
                    ->latest();
            }])
            ->firstOrFail();

        return Inertia::render('Profile', [
            'profile' => $profile,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        dd($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
