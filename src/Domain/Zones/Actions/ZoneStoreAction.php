<?php

namespace Domain\Zones\Actions;

use Domain\Zones\Data\Resources\ZoneResource;
use Domain\Zones\Models\Zone;
use Illuminate\Support\Facades\Hash;

class ZoneStoreAction
{
    public function __invoke(array $data): ZoneResource
    {
        $zone = Zone::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $zone->syncPermissions($data['permisos']);

        return ZoneResource::fromModel($zone);
    }
}
