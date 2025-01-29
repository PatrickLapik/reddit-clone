<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserJoinedCommunityRequest;
use App\Models\Community;
use Illuminate\Http\Request;

class UserJoinedCommunityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserJoinedCommunityRequest $request)
    {
        $request->user()->joinedCommunity()->attach($request->input('community_id'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function destroy(string $id, Request $request)
    {
        $community = Community::findOrFail($id);
        $user = $request->user();
        if ($community->user_id == $user->id) {
            return back()->withErrors('You are the owner of this community. You can not leave this community. Delete this if you want to fully leave.');
        }
        $user->joinedCommunity()->detach($community->id);
    }
}
