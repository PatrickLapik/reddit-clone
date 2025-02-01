<?php

namespace App\Services;

use App\Models\Comment;

class CommentService
{
    public function getPostComments(string $postId, ?string $userId)
    {
        return Comment::where([
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
            ->latest()
            ->get();
    }
}
