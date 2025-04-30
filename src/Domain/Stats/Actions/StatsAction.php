<?php

namespace Domain\Stats\Actions;

use Domain\Users\Models\User;
use Domain\Loans\Models\Loan;
use Domain\Reservations\Models\Reservation;
use Domain\Zones\Models\Zone;
use Domain\Bookcases\Models\Bookcase;
use Domain\Books\Models\Book;

class StatsAction
{
    public function __invoke(): array
    {
        $users = User::withCount('loans')->withCount('reservations')->get()->toArray();

    return [$users];
    }
}
