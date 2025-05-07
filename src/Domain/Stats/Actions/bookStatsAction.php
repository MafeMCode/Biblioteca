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
        ])
        ->get()
        ->map(function ($book) {
            return [
                'name' => $book->title,
                'Loans' => $book->Loans,
                'ISBN' => $book->ISBN,
                'total' => $book->Loans
            ];
        })
        ->sortByDesc('total')
        ->take(10)
        ->values()
        ->toArray();

    return $books;
    }
}
