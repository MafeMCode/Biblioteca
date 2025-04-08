<?php

namespace Domain\Loans\Actions;

use Domain\Books\Models\Book;
use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;

class LoanIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $email = $search[0];
        $title = $search[1];

        $user = User::query()
        ->when($email !== "null", function ($query) use ($email) {
            $query->where('email', 'ILIKE', '%'.$email.'%');
        })->first()->id;

        $book = Book::query()
        ->when($title !== 'null', function ($query) use ($title) {
            $query->where('title', 'ILIKE', '%'.$title.'%');
        })->first()->id;

        $loan = Loan::query()
            ->when($email !== "null" && $user!==null, function ($query) use ($user) {
                $query->where('user_id', 'like', $user);
            })
            ->when($title !== "null", function ($query) use ($book) {
                $query->where('book_id', 'like', $book);
            })
            ->latest()
            ->paginate($perPage);

        return $loan->through(fn($loan) => LoanResource::fromModel($loan));
    }
}
