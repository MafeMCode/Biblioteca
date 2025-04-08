<?php

namespace Domain\Loans\Data\Resources;

use Carbon\Carbon;
use Domain\Books\Models\Book;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;
use Spatie\LaravelData\Data;

class LoanResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $user_id,
        public readonly string $book_id,
        public readonly string $title,
        public readonly string $email,
        public readonly string $created_at,
        public readonly int $days_between,
        public readonly string $due_date,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Loan $loan): self
    {
        $emailUser = $loan->user->email;
        $bookTitle = Book::find($loan->book_id)->title;

        return new self(
            id: $loan->id,
            user_id: $loan->user_id,
            book_id: $loan->book_id,
            email: $emailUser,
            title: $bookTitle,
            created_at: $loan->created_at->format('d/m/Y'),
            days_between: Carbon::now()->diffInDays($loan->due_date),
            updated_at: $loan->updated_at,
            due_date: $loan->due_date->format('d/m/Y'),

        );
    }
}
