<?php

namespace Domain\Bookcases\Data\Resources;

use Domain\Bookcases\Models\Bookcase;
use Domain\Floors\Models\Floor;
use Domain\Zones\Models\Zone;
use Spatie\LaravelData\Data;

class BookcaseResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly int $number,
        public readonly int $capacity,
        public readonly int $zone_number,
        public readonly int $floor_story,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }


    public static function fromModel(Bookcase $bookcase): self
    {
        $zona = Zone::find($bookcase->zone_id);
        $numeroZona = $zona->number;

        $piso = Floor::find($zona->floor_id);
        $story = $piso->story;

        return new self(
            id: $bookcase->id,
            number: $bookcase->number,
            capacity: $bookcase->capacity,
            zone_number: $numeroZona,
            floor_story: $story,
            created_at: $bookcase->created_at->format('Y-m-d H:i:s'),
            updated_at: $bookcase->updated_at->format('Y-m-d H:i:s'),
        );
    }
}
