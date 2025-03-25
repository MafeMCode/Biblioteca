<?php

namespace Database\Seeders;

use Domain\Floors\Models\Floor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FloorSeeder extends Seeder
{
    public function run()
    {
        // Insert specific data
        Floor::create([
            'capacity' => 6,
            'story' => 1,
        ]);
        Floor::create([
            'capacity' => 6,
            'story' => 2,
        ]);

        Floor::create([
            'capacity' => 6,
            'story' => 3,
        ]);

        Floor::create([
            'capacity' => 6,
            'story' => 4,
        ]);

        Floor::create([
            'capacity' => 6,
            'story' => 5,
        ]);

    }
}
