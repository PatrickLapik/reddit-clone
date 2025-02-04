<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
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
    public function store(StoreCommentRequest $request, string $post, ?string $comment = null)
    {
        $commentParentId = $comment;

        $comment = new Comment($request->validated());
        $comment->user()->associate($request->user());
        $comment->post()->associate($post);

        if ($commentParentId) {
            $comment->comment()->associate($commentParentId);
        }

        $comment->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentRequest $request, Comment $comment)
    {
        if ($request->user()->cannot('update', $comment)) {
            abort(403);
        }
        $comment->body = $request->validated()['body'];
        $comment->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Comment $comment)
    {
        if ($request->user()->cannot('update', $comment)) {
            abort(403);
        }
        $comment->delete();
    }
}
