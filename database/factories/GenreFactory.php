<?php

use Illuminate\Database\Eloquent\Factories\Factory;

class GenreFactory extends Factory
{
    public function definition()
    {
        return [
            'name'=>fake()->unique(),
        ];
    }
}
