<?php

namespace Domain\Users\Actions;

use Carbon\Carbon;
use Domain\Users\Models\User;

class UserLoanHistoryAction
{
    public function __invoke(User $user): array
    {
        $loans = $user->loans()
            ->withTrashed()
            ->with('book')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($loan) {

                $overdue = false;

                if ($loan->is_active && Carbon::today()>$loan->due_date || $loan->returned_at > $loan->due_date){
                    $overdue = true;
                }

                return [
                    'title' => $loan->book->title ?? null, // null-safe in case the book is missing
                    'ISBN' => $loan->book->ISBN ?? null, // null-safe in case the book is missing
                    'imgURL' => $loan->book->getFirstMediaUrl('media'),
                    'isActive' => $loan->is_active,
                    'returnedAt' => optional($loan->returned_at)->format('d/m/Y'),
                    'dueDate' => $loan->due_date->format('d/m/Y'),
                    'overdue' => $overdue,
                    'author' => $loan->book->author,
                ];
            })
            ->toArray();

        return $loans;
    }
}
