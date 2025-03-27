<?php

use Domain\Bookcases\Models\Bookcase;
use Illuminate\Database\Eloquent\Factories\Factory;

class FloorFactory extends Factory
{
    public function definition()
    {
        $bookcase = Bookcase::all()->random()->id;

        return [

            'title' => $this->faker->name,
            'author' => $this->faker->name,
            'genres' => $this->faker->name,
            'length' => $this->faker->numberBetween(300, 900),
            'editor' => $this->faker->name,
            'bookcase_id' => $bookcase,

        ];
    }
}
