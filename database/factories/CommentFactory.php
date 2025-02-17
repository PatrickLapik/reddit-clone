<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $created_at = fake()->dateTimeBetween('-2 years', 'now');
        $updated_at = $created_at;

        if(rand(0,1)) {
            $updated_at = fake()->dateTimeBetween($created_at, 'now');
        }

        return [
            'body' => fake()->sentences(rand(1, 3), true),
            'created_at' => $created_at,
            'updated_at' => $updated_at,
        ];
    }
}
