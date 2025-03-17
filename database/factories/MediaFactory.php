<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Media>
 */
class MediaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $rand = rand(0,2);

        if($rand == 0) {
            $size = '/200/300';
        } else if ($rand == 1) {
            $size = '/200';
        } else {
            $size = '/300/200';
        }

        $url = 'https://picsum.photos/seed/'. fake()->uuid .$size;

        return [
            'path' => $url,
        ];
    }
}
