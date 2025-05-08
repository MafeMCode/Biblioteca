<?php

namespace Domain\Stats\Actions;

use Domain\Users\Models\User;
use Domain\Loans\Models\Loan;
use Domain\Reservations\Models\Reservation;
use Domain\Zones\Models\Zone;
use Domain\Bookcases\Models\Bookcase;
use Domain\Books\Models\Book;

class bookStatsAction
{
    public function __invoke(): array
    {
        $books = Book::withCount([
            'loansWithTrashed as Loans',
            'reservationsWithTrashed as Reservations',
        ])
        ->get()
        ->map(function ($book) {
            return [
                'name' => $book->title,
                'Loans' => $book->Loans,
                'ISBN' => $book->ISBN,
                'Reservations' => $book->Reservations,
                'total' => $book->Loans+$book->Reservations
            ];
        })
        ->groupBy('ISBN')
        ->map(function ($books) {
            $totalLoans = $books->sum(function ($book) {
                return $book['Loans'];
            });
            $totalReservations = $books->sum(function ($book) {
                return $book['Reservations'];
            });
            $representativeBook = $books->first();
            $result = $representativeBook;
            $result['Loans'] = $totalLoans;
            $result['Reservations'] = $totalReservations;
            $result['total'] = $totalLoans + $totalReservations;
            return $result;
        });

        $zonesByTotal = $books
        ->sortByDesc('total')
        ->take(10)
        ->values()
        ->map(function ($zone, $index) {
            $zone['index'] = $index + 1; // index starts from 1
            return $zone;
        })
        ->toArray();

        $zonesByLoans = $books
        ->sortByDesc('Loans')
        ->take(10)
        ->values()
        ->map(function ($zone, $index) {
            $zone['index'] = $index + 1; // index starts from 1
            return $zone;
        })
        ->toArray();

        $zonesByReservations = $books
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
