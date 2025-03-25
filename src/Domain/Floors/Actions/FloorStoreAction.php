<?php

namespace Domain\Users\Actions;

use Domain\Floors\Data\Resources\FloorResource;
use Domain\Floors\Models\Floor;

class FloorDestroyAction
{
    public function __invoke(array $data): FloorResource
    {
        $floor = Floor::create([
            'story' => $data['story'],  // Must secure unique in validations!!!
            'capacity' => $data['capacity'],
        ]);

        return FloorResource::fromModel($floor);
    }
}
