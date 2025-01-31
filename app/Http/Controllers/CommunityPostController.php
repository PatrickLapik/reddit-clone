<?php

namespace App\Http\Controllers;

use App\Models\Community;
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
        $post = Post::where('id', $post)->select('id', 'community_id', 'user_id', 'title', 'body', 'created_at')
            ->with([
                'community:id,name,icon',
                'user:id,name,avatar',
                'votes' => function ($query) use ($userId) {
                    $query->where('user_id', $userId)->select('id','voteable_id','value');
                }
            ])
            ->withSum('votes', 'value')
            ->first();

        return Inertia::render('Post/View', [
            'post' => $post,
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
