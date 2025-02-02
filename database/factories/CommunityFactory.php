<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Community>
 */
class CommunityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $created = fake()->dateTimeBetween('-2 years', 'now');

        $icon = null;
        $banner = null;

        if(rand(0,9)){
            $icon = 'https://picsum.photos/seed/'. fake()->uuid .'/200';
            $banner = 'https://picsum.photos/seed/'. fake()->uuid .'/1280/720';
        }
        return [
            'name' => fake()->unique()->word(),
            'description' => fake()->realTextBetween(300, 500, 2),
            'icon' => $icon ??= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s',
            'banner' => $banner ??= 'https://www.guardianoffshore.com.au/wp-content/uploads/2015/03/banner-placeholder.jpg',
            'created_at' => $created,
        ];
    }
}
