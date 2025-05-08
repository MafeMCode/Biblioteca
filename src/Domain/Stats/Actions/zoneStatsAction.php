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
            });

        $zonesByTotal = $zones
        ->sortByDesc('total')
        ->take(10)
        ->values()
        ->map(function ($zone, $index) {
            $zone['index'] = $index + 1; // index starts from 1
            return $zone;
        })
        ->toArray();

        $zonesByLoans = $zones
        ->sortByDesc('Loans')
        ->take(10)
        ->values()
        ->map(function ($zone, $index) {
            $zone['index'] = $index + 1; // index starts from 1
            return $zone;
        })
        ->toArray();

        $zonesByReservations = $zones
        ->sortByDesc('Reservations')
        ->take(10)
        ->values()
        ->map(function ($zone, $index) {
            $zone['index'] = $index + 1; // index starts from 1
            return $zone;
        })
        ->toArray();

        $res = ['total' => $zonesByTotal, 'loans' => $zonesByLoans, 'reservations' => $zonesByReservations];

        return $res;
    }
}
