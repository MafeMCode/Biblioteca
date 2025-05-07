<?php

namespace Domain\Stats\Actions;

use Domain\Users\Models\User;
use Domain\Loans\Models\Loan;
use Domain\Reservations\Models\Reservation;
use Domain\Zones\Models\Zone;
use Domain\Bookcases\Models\Bookcase;
use Domain\Books\Models\Book;

class zoneStatsAction
{
    public function __invoke(): array
    {
        $zones = Zone::all()
            ->map(function ($zone) {
                $totalLoans = 0;
                $totalReservations = 0;

                foreach ($zone->bookcases as $bookcase) {
                    foreach ($bookcase->books as $book) {
                        $totalLoans += $book->loansWithTrashed->count();
                        $totalReservations += $book->reservationsWithTrashed->count();
                    }
                }
                $totalActivity = $totalLoans + $totalReservations;

                return [
                    'zonename' => $zone->number,
                    'floor' => $zone->floor->story,
                    'Loans' => $totalLoans,
                    'Reservations' => $totalReservations,
                    'total' => $totalActivity
                ];
            })
            ->sortByDesc('total')
            ->take(10)
            ->values()
            ->toArray();


        return $zones;
    }
}
