<?php

namespace Database\Seeders;

use App\Models\Community;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommunitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $communities = Community::factory(100)->make();
        $testUser = User::find(1)->first();
        $users = User::where('id', '!=', 1)->select('id')->get();

        foreach ($communities as $community) {
            $user = $users->random();
            $community->user_id = $user->id;
            $user->joinedCommunities()->attach($community->id);
            $community->save();
        }

        $testUser->joinedCommunities()->attach($communities->take(6)->pluck('id'));

        foreach ($users as $user) {
            $user->joinedCommunities()->attach($communities->take(rand(0, 20))->pluck('id'));
        }
    }
}
