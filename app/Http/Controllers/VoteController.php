<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVoteRequest;
use App\Http\Requests\UpdateVoteRequest;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Vote;

class VoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVoteRequest $request)
    {
        $vote = new Vote($request->validated());
        $vote->user()->associate($request->user());

        $voteable = $request->input('voteable_type') == 'post' ? Post::findOrFail($request->input('voteable_id')) : Comment::findOrFail($request->input('voteable_id'));

        $vote->voteable()->associate($voteable);

        $vote->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(Vote $vote)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vote $vote)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Vote $vote, UpdateVoteRequest $request)
    {
        $vote->value = $request->validated()['value'];
        $vote->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vote $vote)
    {
        $vote->deleteOrFail();
    }
}
