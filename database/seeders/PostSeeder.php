<?php

namespace Database\Seeders;

use App\Models\Community;
use App\Models\Media;
use App\Models\Post;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::inRandomOrder()->select('id')->get();
        $posts = Post::factory(1000)->make();
        $communities = Community::inRandomOrder()->select('id')->get();

        foreach ($posts as $post) {
            $randVotes = rand(0, $users->count() / rand(1, $users->count()));

            $post->user_id = $users->random()->id;

            if (rand(0, 2)) {
                $post->community_id = $communities->random()->id;
            }

            $post->save();

            if (rand(0, 7)) {
                Media::factory()
                    ->count(rand(1, 10))
                    ->for($post)
                    ->create();
            }

            foreach ($users as $user) {
                if (!$randVotes) {
                    break;
                }
                Vote::factory(1)
                    ->type(Post::class)
                    ->for($post, 'voteable')
                    ->for($user)
                    ->create();
                $randVotes--;
            }
        }
    }
}
