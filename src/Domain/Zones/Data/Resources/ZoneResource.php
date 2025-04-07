<?php

namespace Domain\Zones\Data\Resources;

use Domain\Zones\Models\Zone;
use Domain\Floors\Models\Floor;
use Spatie\LaravelData\Data;

class ZoneResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly int $number,
        public readonly string $genre,
        public readonly int $capacity,
        public readonly string $genre_name,
        public readonly int $floor_story,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }


    public static function fromModel(Zone $zone): self
    {

        $piso = Floor::find($zone->floor_id);
        $story = $piso->story;

        return new self(
            id: $zone->id,
            number: $zone->number,
            capacity: $zone->capacity,
            genre_name: $zone->genreName,
            genre: $zone->genre,
            floor_story: $story,
            created_at: $zone->created_at->format('Y-m-d H:i:s'),
            updated_at: $zone->updated_at->format('Y-m-d H:i:s'),
        );
    }
}
