<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommunityRequest;
use App\Models\Community;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class CommunityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CommunityRequest $request)
    {
        $community = new Community($request->validated());
        $community->user()->associate($request->user());

        if ($request->file('icon')) {
            $url = $request->file('icon')->store('community', ['disk' => 'public']);
            $community->icon = Storage::url($url);
        }

        if ($request->file('banner')) {
            $url = $request->file('banner')->store('community', ['disk' => 'public']);
            $community->banner = Storage::url($url);
        }

        $community->save();

        $community->joinedUsers()->attach($request->user());

        return redirect(route('community.show', ['community' => $community->name]));
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request): Response
    {
        $userId = auth()->guard()->id();

        $community = Community::where('name', $request->route('community'))
            ->with([
                'posts' => function ($query) {
                    $query->withSum('votes', 'value');
                },
                'posts.user:name,id,avatar',
                'posts.votes' => function ($query) use ($userId) {
                    $query->where('user_id', $userId)->select('id', 'value', 'voteable_id');
                },
            ])
            ->first();

        if ($community == null) {
            return redirect(route('profile'));
        }

        $user = $request->user();
        $isJoined = $user ? $user->joinedCommunities()->where('community_id', $community->id)->exists() : false;

        return Inertia::render('Community/Main', [
            'community' => $community,
            'isJoined' => $isJoined,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function checkUniqueName(CommunityRequest $request) {}
}
