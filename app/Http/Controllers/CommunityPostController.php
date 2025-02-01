<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommunityPostController extends Controller
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $community, string $post)
    {
        $userId = auth()->guard()->id();
        $postId = $post;

        $post = Post::where('id', $postId)->select('id', 'community_id', 'user_id', 'title', 'body', 'created_at')
            ->with([
                'community:id,name,icon',
                'user:id,name,avatar',
                'votes' => function ($query) use ($userId) {
                    $query->where('user_id', $userId)->select('id','voteable_id','value');
                }
            ])
            ->withSum('votes', 'value')
            ->first();

        $comments = Comment::where([
            ['post_id', $postId],
            ['comment_id', null],
        ])
            ->with([
                'user:id,name,avatar',
                'replies',
                'votes' => function ($query) use ($userId) {
                    $query->where('user_id', $userId)
                        ->select('id', 'value', 'voteable_id');
                }
            ])
            ->withSum('votes', 'value')
            ->get();

        return Inertia::render('Post/View', [
            'post' => $post,
            'comments' => $comments,
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
}
