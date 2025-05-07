<?php

namespace Database\Seeders;

use Domain\Reservations\Models\Reservation;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    public function run()
    {
        // Insert specific data

        Reservation::factory(20)->create();

    }
}
