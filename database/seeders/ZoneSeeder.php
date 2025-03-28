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
