<?php

namespace Domain\Reservations\Data\Resources;

use Domain\Reservations\Models\Reservation;
use Spatie\LaravelData\Data;

class ReservationResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $user_id,
        public readonly string $book_id,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Reservation $reservation): self
    {
        return new self(
            id: $reservation->id,
            user_id: $reservation->user_id,
            book_id: $reservation->book_id,
            created_at: $reservation->created_at,
            updated_at: $reservation->updated_at,
        );
    }
}
