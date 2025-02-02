<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $created_at = fake()->dateTimeBetween('-2 years', 'now');
        return [
            'title' => fake()->realText(100),
            'body' => fake()->realTextBetween(200, 400, 2),
            'created_at' => $created_at,
        ];
    }
}
