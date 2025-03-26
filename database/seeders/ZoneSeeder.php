<?php

namespace Database\Seeders;

use Domain\Floors\Models\Floor;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ZoneSeeder extends Seeder
{
    public function run()
    {
        // Insert specific data
        Zone::create([
            'number' => 1,
            'capacity' => 5,
            'genre' => 'Drama',
            'floor_id' => Floor::all()->random()->id
        ]);
        Zone::create([
            'number' => 2,
            'capacity' => 6,
            'genre' => 'Sci-Fi',
            'floor_id' => Floor::all()->random()->id
        ]);
        Zone::create([
            'number' => 1,
            'capacity' => 8,
            'genre' => 'Ficcion',
            'floor_id' => Floor::all()->random()->id
        ]);
        Zone::create([
            'number' => 5,
            'capacity' => 3,
            'genre' => 'Terror',
            'floor_id' => Floor::all()->random()->id
        ]);
        Zone::create([
            'number' => 3,
            'capacity' => 5,
            'genre' => 'Literatura Clasica',
            'floor_id' => Floor::all()->random()->id
        ]);
        Zone::create([
            'number' => 6,
            'capacity' => 6,
            'genre' => 'Matematicas',
            'floor_id' => Floor::all()->random()->id
        ]);

        $floorSobrecargado = Floor::all()->random()->id;

        Zone::create([
            'number' => 1,
            'capacity' => 6,
            'genre' => 'Matematicas',
            'floor_id' => $floorSobrecargado
        ]);

        Zone::create([
            'number' => 2,
            'capacity' => 6,
            'genre' => 'Matematicas',
            'floor_id' => $floorSobrecargado
        ]);

        Zone::create([
            'number' => 3,
            'capacity' => 6,
            'genre' => 'Matematicas',
            'floor_id' => $floorSobrecargado
        ]);

        Zone::create([
            'number' => 4,
            'capacity' => 6,
            'genre' => 'Matematicas',
            'floor_id' => $floorSobrecargado
        ]);

        Zone::create([
            'number' => 5,
            'capacity' => 6,
            'genre' => 'Matematicas',
            'floor_id' => $floorSobrecargado
        ]);

        Zone::create([
            'number' => 6,
            'capacity' => 6,
            'genre' => 'Matematicas',
            'floor_id' => $floorSobrecargado
        ]);


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
