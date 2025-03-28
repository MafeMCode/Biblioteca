<?php
namespace Database\Factories;

use Domain\Floors\Models\Floor;
use Domain\Genres\Models\Genre;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Eloquent\Factories\Factory;

class ZoneFactory extends Factory
{
    protected $model = Zone::class;

    public function definition()
    {
        $floor = Floor::all()->random()->id;

        $genre = Genre::all()->random()->id;
        $genreName = Genre::find($genre)->name;

        return [
            'number' => fake()->numberBetween(1, 6),
            'capacity' => fake()->numberBetween(1, 30),
            'genre' => $genre,
            'genreName' => $genreName,
            'floor_id' => $floor,
        ];
    }
}
