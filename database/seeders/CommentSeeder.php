<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{

    private $users;

    public function __construct()
    {
        $this->users = User::select('id')->get();
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $posts = Post::inRandomOrder()->select('id')->get();

        foreach ($posts as $post) {
            $topLevelComments = Comment::factory(rand(0, 5))
                ->for($post)
                ->for($this->users->random())
                ->create();
            foreach ($topLevelComments as $comment) {
                $this->seedReplies($comment, $this->users->random(), $post);
            }
        }
    }

    private function seedReplies(Comment $comment, User $user, Post $post, int $depth = 0): void
    {
        if ($depth >= 3) {
            return;
        }

        $replies = Comment::factory(rand(0,3))
            ->for($post)
            ->for($comment)
            ->for($user)
            ->create();

        foreach ($replies as $reply) {
            $this->seedReplies($reply, $this->users->random(), $post, $depth + 1);
        }
    }
}
