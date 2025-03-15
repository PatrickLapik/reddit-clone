<?php

namespace App\Services;

use App\Models\Post;

class PostService
{
    public function getPost(string $postId, ?string $userId)
    {
        return Post::where('id', $postId)->select('id', 'community_id', 'user_id', 'title', 'body', 'created_at')
            ->with([
                'user:id,name,avatar',
                'media',
                'community:id,name,icon',
                'votes' => function ($query) use ($userId) {
                    $query->where('user_id', $userId)->select('id', 'voteable_id', 'value');
                }
            ])
            ->withCount('comments')
            ->withSum('votes', 'value')
            ->firstOrFail();
    }

    public function getPosts()
    {
        return Post::select('id', 'user_id', 'community_id', 'title', 'body', 'created_at')
            ->with([
                'user:id,name,avatar',
                'community:id,icon,name',
                'media',
                'votes' => function ($query) {
                    $query->where('user_id', auth()->guard()->id())->select('id', 'voteable_id', 'value');
                }
            ])
            ->withCount('comments')
            ->withSum('votes', 'value')
            ->latest()
            ->cursorPaginate(10);
    }

    public function getCommunityPosts(string $communityId, ?string $userId)
    {
        return Post::where('community_id', $communityId)
            ->with([
                'user:name,id,avatar',
                'media',
                'votes' => function ($query) use ($userId) {
                    $query->where('user_id', $userId)->select('id', 'value', 'voteable_id');
                },

            ])
            ->withCount('comments')
            ->withSum('votes', 'value')
            ->get();
    }
}
