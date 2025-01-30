<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
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
        return Inertia::render('Post/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $post = new Post($request->validated());
        $post->user()->associate($request->user());

        $post->save();

        return redirect(route('profile', ['name' => $request->user()->name]));
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $post = Post::with(['user:id,name,avatar'])->findOrFail($request->route('post'));

        return Inertia::render('Post/View', [
            'post' => $post->only('id', 'title', 'body', 'created_at'),
            'author' => $post->user,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
