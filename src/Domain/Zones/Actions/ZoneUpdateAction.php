<?php

namespace Domain\Zones\Actions;

use Domain\Genres\Models\Genre;
use Domain\Zones\Data\Resources\ZoneResource;
use Domain\Zones\Models\Zone;
use Illuminate\Support\Facades\Hash;

class ZoneUpdateAction
{
    public function __invoke(Zone $zone, array $data): ZoneResource
    {
        $genre = Genre::find($data['genre'])->name;
        $updateData = [
            'number' => $data['number'],
            'capacity' => $data['capacity'],
            'floor_id' => $data['floor_id'],
            'genre' => $data['genre'],
            'genreName' => $genre,
        ];

        $zone->update($updateData);

        return ZoneResource::fromModel($zone->fresh());
    }
}
