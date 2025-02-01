<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Community;
use App\Models\Post;
use App\Services\PostService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(PostService $postService)
    {
        $userId = auth()->guard()->id();

        $posts = $postService->getPosts($userId);

        return Inertia::render('Home', [
            'posts' => $posts,
        ]);
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

        $communityId = $request->input('community_id');

        if ($communityId) {
            $post->community()->associate($communityId);

            $post->save();

            $community = Community::findOrFail($communityId)->select('name')->first();

            return redirect((route('community.show', ['community' => $community->name])));
        }

        $post->save();

        return redirect(route('profile', ['name' => $request->user()->name]));
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        if ($post->community) {
            return redirect(route('community.post.show', [
                'community' => $post->community->name,
                'post' => $post->id,
            ]));
        }

        return redirect(route('user.post.show', [
            'user' => $post->user->name,
            'post' => $post->id,
        ]));
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
        if ($request->user()->cannot('update', $post)) {
            abort(403);
        }

        $post->body = $request->validated()['body'];
        $post->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Post $post)
    {
        if ($request->user()->cannot('delete', $post)) {
            abort(403);
        }

        $post->delete();

        return redirect()->route('profile');
    }
}
