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
    private CommentService $commentService;
    private PostService $postService;

    public function __construct(CommentService $commentService, PostService $postService)
    {
        $this->commentService = $commentService;
        $this->postService = $postService;
    }

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
    public function show(string $community, string $post, Request $request)
    {
        $userId = auth()->guard()->id();
        $postId = $post;

        $post = $this->postService->getPost($postId, $userId);
        $comments = $this->commentService->getPostComments($postId);
        $editableComments = $this->commentService->getEditableComments($postId);

        return Inertia::render('Post/View', [
            'post' => $post,
            'comments' => $comments,
            'can' => [
                'edit_post' => $request->user() ? $request->user()->can('update', $post) : false,
                'edit_comments' => $editableComments,
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
