<?php

namespace Database\Seeders;

use Domain\Bookcases\Models\Bookcase;
use Domain\Floors\Models\Floor;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookcaseSeeder extends Seeder
{
    public function run()
    {
        // Insert specific data
        Bookcase::create([
            'number' => 1,
            'capacity' => 50,
            'zone_id' => Zone::all()->random()->id
        ]);
        Bookcase::create([
            'number' => 1,
            'capacity' => 50,
            'zone_id' => Zone::all()->random()->id
        ]);
        Bookcase::create([
            'number' => 1,
            'capacity' => 50,
            'zone_id' => Zone::all()->random()->id
        ]);
        Bookcase::create([
            'number' => 1,
            'capacity' => 50,
            'zone_id' => Zone::all()->random()->id
        ]);
        Bookcase::create([
            'number' => 1,
            'capacity' => 50,
            'zone_id' => Zone::all()->random()->id
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
