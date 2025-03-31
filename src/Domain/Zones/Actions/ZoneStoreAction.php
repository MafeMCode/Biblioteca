<?php

namespace Domain\Zones\Actions;

use Domain\Genres\Models\Genre;
use Domain\Zones\Data\Resources\ZoneResource;
use Domain\Zones\Models\Zone;
use Illuminate\Support\Facades\Hash;

class ZoneStoreAction
{
    public function __invoke(array $data): ZoneResource
    {
        $genre = Genre::find($data['genre'])->name;

        $zone = Zone::create([
            'number' => $data['number'],
            'capacity' => $data['capacity'],
            'floor_id' => $data['floor_id'],
            'genre' => $data['genre'],
            'genreName' => $genre,
        ]);

        return ZoneResource::fromModel($zone);
    }
}
