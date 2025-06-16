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
        $zones = Zone::all(['id']); // Get all genre records

        foreach ($zones as $zone) {
            Bookcase::factory()->create([
            'number'=>1,
            'capacity' => fake()->numberBetween(20,30),
            'zone_id'=> $zone->id,
        ]);
        }

        Bookcase::factory(50)->create();


    }
}
