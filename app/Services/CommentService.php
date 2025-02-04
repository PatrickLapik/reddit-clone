<?php

namespace App\Services;

use App\Models\Comment;

class CommentService
{
    public function getPostComments(string $postId)
    {
        return Comment::where([
            ['post_id', $postId],
            ['comment_id', null],
        ])
            ->with([
                'user:id,name,avatar',
                'replies',
                'votes' => function ($query) {
                    $query->where('user_id', auth()->guard()->id())
                        ->select('id', 'value', 'voteable_id');
                }
            ])
            ->withSum('votes', 'value')
            ->latest()
            ->get();
    }

    public function getEditableComments(string $postId)
    {
        return Comment::where([
            ['user_id', auth()->guard()->id()],
            ['post_id', $postId],
        ])
            ->select('id')
            ->get();
    }

}
