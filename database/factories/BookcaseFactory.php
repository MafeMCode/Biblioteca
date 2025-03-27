<?php

use Domain\Floors\Models\Floor;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookcaseFactory extends Factory
{
    public function definition()
    {
        $randomzone = Floor::all()->random()->id;
        return [
            'number'=>fake()->unique()->numberBetween($min=1, $max=10),
            'zone_id'=> $randomzone,
        ];
    }
}
