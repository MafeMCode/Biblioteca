<?php

namespace Domain\Bookcases\Actions;

use Domain\Bookcases\Data\Resources\BookcaseResource;
use Domain\Bookcases\Models\Bookcase;

class BookcaseIndexAction
{
    public function __invoke(?string $search = null, int $perPage = 10)
    {
        $users = Bookcase::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate($perPage);

        return $users->through(fn ($user) => BookcaseResource::fromModel($user));
    }
}
