<?php

namespace Domain\Floors\Actions;

use Domain\Floors\Data\Resources\FloorResource;
use Domain\Floors\Models\Floor;
use Illuminate\Support\Facades\Log;

class FloorIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $story = $search[0];
        $capacity = $search[1];

        $floor = Floor::query()
            ->when($story !== "null", function ($query) use ($story) {

                $query->where('story', '=', $story);
            })
            ->when($capacity !== "null", function ($query) use ($capacity) {
                $query->where('capacity', '=', $capacity);
            })
            ->latest()
            ->paginate($perPage);

        return $floor->through(fn($floor) => FloorResource::fromModel($floor));
    }
}
