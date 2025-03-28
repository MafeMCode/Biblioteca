<?php
namespace Database\Factories;

use Domain\Genres\Models\Genre;
use Illuminate\Database\Eloquent\Factories\Factory;

class GenreFactory extends Factory
{
    protected $model = Genre::class;

    public function definition()
    {
        return [
            'name'=>fake()->unique(),
        ];
    }
}
