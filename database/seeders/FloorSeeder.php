<?php

namespace Database\Seeders;

use Domain\Floors\Models\Floor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FloorSeeder extends Seeder
{
    public function run()
    {

        Floor::factory(10)->create();

    }
}
