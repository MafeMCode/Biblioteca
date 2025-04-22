<?php

namespace Domain\Reservations\Actions;

use Domain\Books\Models\Book;
use Domain\Reservations\Data\Resources\ReservationResource;
use Domain\Reservations\Models\Reservation;
use Domain\Users\Models\User;

class ReservationIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $book = $search[0];
        $user = $search[1];
        // $status = $search[2];

        $book_ids = Book::query()
        ->when($book != 'null', function ($query) use ($book) {
            $query->where('title', 'ILIKE', '%'.$book.'%');
        })->pluck('id');

        $user_ids = User::query()
        ->when($user != 'null', function ($query) use ($user) {
            $query->where('email', 'ILIKE', '%'.$user.'%');
        })->pluck('id');

        // $users = User::query()
        // ->when($email !== "null", function ($query) use ($email) {
        //     $query->where('email', 'ILIKE', '%'.$email.'%');
        // })->pluck('id');

        // $books = Book::query()
        // ->when($title !== 'null', function ($query) use ($title) {
        //     $query->where('title', 'ILIKE', '%'.$title.'%');
        // })->pluck('id');

        $reservation = Reservation::query()
        ->when($book_ids != null, function ($query) use ($book_ids) {
            $query->whereIn('book_id', $book_ids);
        })
        ->when($book_ids != null, function ($query) use ($user_ids) {
            $query->whereIn('user_id', $user_ids);
        })
        ->latest()
        ->paginate($perPage);

        return $reservation->through(fn($loan) => ReservationResource::fromModel($loan));
    }
}
