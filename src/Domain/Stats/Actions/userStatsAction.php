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

    $usersByTotal = $users
    ->sortBy([
        ['total', 'desc'],
        ['Loans', 'desc'],
        ['created_at', 'asc'],
        ['name', 'asc'],
    ])
    ->take(10)
    ->map(function ($zone) {
        if ($zone['Loans'] > 0 || $zone['Reservations'] > 0) {
            return $zone;
        }
    })
    ->values()
    ->map(function ($zone, $index) {
        $zone['index'] = $index + 1; // index starts from 1
        return $zone;
    })
    ->toArray();

    $usersByTotal = array_filter($usersByTotal);

    $usersByLoans = $users
    ->sortBy([
        ['Loans', 'desc'],
        ['created_at', 'asc'],
        ['name', 'asc'],
    ])
    ->take(10)
    ->map(function ($zone) {
        if ($zone['Loans'] > 0) {
            return $zone;
        }
    })
    ->values()
    ->map(function ($zone, $index) {
        $zone['index'] = $index + 1; // index starts from 1
        return $zone;
    })
    ->toArray();

    $usersByLoans = array_filter($usersByLoans);

    $usersByReservations = $users
    ->sortBy([
        ['Reservations', 'desc'],
        ['created_at', 'asc'],
        ['name', 'asc'],
    ])
    ->take(10)
    ->map(function ($zone) {
        if ($zone['Reservations'] > 0) {
            return $zone;
        }
    })
    ->values()
    ->map(function ($zone, $index) {
        $zone['index'] = $index + 1; // index starts from 1
        return $zone;
    })
    ->toArray();

    $usersByReservations = array_filter($usersByReservations);

    $res = ['total' => $usersByTotal, 'loans' => $usersByLoans, 'reservations' => $usersByReservations];

    return $res;
    }
}
