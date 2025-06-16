<?php

namespace Database\Seeders;

use Domain\Floors\Models\Floor;
use Domain\Genres\Models\Genre;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ZoneSeeder extends Seeder
{
    public function run()
    {
        $floors = Floor::pluck('id')->toArray();
        $genres = Genre::all(['id', 'name']); // Get all genre records

        foreach ($genres as $genre) {
            Zone::factory()->create([
                'number'     => fake()->numberBetween(1, 6),
                'capacity'   => fake()->numberBetween(1, 30),
                'genre'      => $genre->id,
                'genreName'  => $genre->name,
                'floor_id'   => fake()->randomElement($floors),
            ]);
        }

        // Insert specific data


        Zone::factory(60)->create();

        // Schema::create('zones', function (Blueprint $table) {
        //     $table->uuid('id')->primary()->unique();
        //     $table->integer('number');
        //     $table->string('genre');
        //     $table->integer('capacity');
        //     $table->foreignUuid('floor_id')->constrained(table:'floors', indexName:'id')->cascadeOnDelete();
        //     $table->timestamps();
        // });

    }
}
