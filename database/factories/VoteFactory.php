<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vote>
 */
class VoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $vote = -1;

        if (rand(0, 4)) {
            $vote = 1;
        }

        return [
            'value' => $vote
        ];
    }

    public function type(string $type): static
    {
        return $this->state(fn (array $attributes) => [
            'voteable_type' => $type,
        ]);
    }
}
