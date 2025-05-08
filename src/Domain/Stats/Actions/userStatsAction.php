<?php

namespace Domain\Stats\Actions;

use Carbon\Carbon;
use Domain\Users\Models\User;
use Domain\Loans\Models\Loan;
use Domain\Reservations\Models\Reservation;
use Domain\Zones\Models\Zone;
use Domain\Bookcases\Models\Bookcase;
use Domain\Books\Models\Book;

class userStatsAction
{
    public function __invoke()
    {

        $dateStart =Carbon::create(1970, 1, 1);
        $dateEnd = Carbon::now();

    $users = User::withCount([
        'loansWithTrashed as Loans' => function ($query) use ($dateStart, $dateEnd) {
            $query->where('created_at', '>=', $dateStart);
            $query->where('created_at', '<=', $dateEnd);
        },
        'reservationsWithTrashed as Reservations' => function ($query) use ($dateStart, $dateEnd) {
            $query->where('created_at', '>=', $dateStart);
            $query->where('created_at', '<=', $dateEnd);
        }
    ])
    ->get()
    ->map(function ($user) {
        return [
            'name' => $user->name,
            'Loans' => $user->Loans,
            'Reservations' => $user->Reservations,
            'total' => $user->Loans + $user->Reservations
        ];
    });

    $zonesByTotal = $users
    ->sortByDesc('total')
    ->take(10)
    ->values()
    ->map(function ($zone, $index) {
        $zone['index'] = $index + 1; // index starts from 1
        return $zone;
    })
    ->toArray();

    $zonesByLoans = $users
    ->sortByDesc('Loans')
    ->take(10)
    ->values()
    ->map(function ($zone, $index) {
        $zone['index'] = $index + 1; // index starts from 1
        return $zone;
    })
    ->toArray();

    $zonesByReservations = $users
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
