<?php

namespace Domain\Users\Actions;

use Carbon\Carbon;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;

class UserLoanHistoryAction
{
    public function __invoke(User $user): array
    {

        $loans = $user->loans()
            ->withTrashed()
            ->with('book')
            ->get();

        $reservations = $user->reservations()
            ->withTrashed()
            ->with('book')
            ->get();

        $loans->each->setAttribute('type', 'loan');
        $reservations->each->setAttribute('type', 'reservation');

        $merged = $loans->merge($reservations)
            ->sortByDesc('created_at')
            ->values();

        $activities = $merged->map(function ($activity) {

            /** Analizar el tipo de dato primero y rellenar valores en funcion  de lo que sea poara poder tener un eleento unico */
            return [
                'title' => $activity->book->title ?? null,
                'ISBN' => $activity->book->ISBN ?? null,
                'imgURL' => $activity->book->getFirstMediaUrl('media') ?? null,
                'isActive' => $activity['type'] == 'loan' ? $activity->is_active : null,
                'returnedAt' => $activity['type'] == 'loan' ? optional($activity->returned_at)->format('d/m/Y') : null,
                'dueDate' => $activity['type'] == 'loan' ? $activity->due_date->format('d/m/Y') : null,
                'createdAt' => $activity->created_at->format('d/m/Y') ?? null,
                'overdue' => $activity['type'] == 'loan' ? $activity->is_active && Carbon::today() > $activity->due_date || $activity->returned_at > $activity->due_date : null,
                'author' => $activity->book->author ?? null,
                'type' => $activity->type ?? null,
            ];
        })
            ->toArray();

       return $activities;
    }
}
