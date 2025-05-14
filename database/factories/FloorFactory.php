<?php
namespace Database\Factories;

use Domain\Floors\Models\Floor;
use Illuminate\Database\Eloquent\Factories\Factory;

class FloorFactory extends Factory
{
    protected $model = Floor::class;

    public function definition()
    {
        return [
            'story'=>fake()->unique()->numberBetween($min=1, $max=10),
            'capacity'=>fake()->numberBetween($min=1, $max=20)
        ];
    }
}
