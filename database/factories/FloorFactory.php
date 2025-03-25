<?php

use Illuminate\Database\Eloquent\Factories\Factory;

class FloorFactory extends Factory
{
    public function definition()
    {
        return [
            'story'=>fake()->unique()->numberBetween($min=1, $max=10),
        ];
    }
}
