<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use App\Services\CommentService;
use App\Services\PostService;
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
    public function show(string $community, string $post, PostService $postService, CommentService $commentService, Request $request)
    {
        $userId = auth()->guard()->id();
        $postId = $post;

        $post = $postService->getPost($postId, $userId);
        $comments = $commentService->getPostComments($postId, $userId);

        return Inertia::render('Post/View', [
            'post' => $post,
            'comments' => $comments,
            'can' => [
                'edit_post' => $request->user() ? $request->user()->can('update', $post) : false,
            ],
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
