<?php
namespace Database\Factories;

use Domain\Bookcases\Models\Bookcase;
use Domain\Floors\Models\Floor;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookcaseFactory extends Factory
{
    protected $model = Bookcase::class;

    public function definition()
    {
        $randomzone = Zone::all()->random()->id;

        return [
            'number'=>fake()->unique()->numberBetween($min=1, $max=500),
            'capacity' => fake()->numberBetween(20,30),
            'zone_id'=> $randomzone,
        ];
    }
}
