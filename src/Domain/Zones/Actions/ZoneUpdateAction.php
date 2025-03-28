<?php

namespace Domain\Zones\Actions;

use Domain\Zones\Data\Resources\ZoneResource;
use Domain\Zones\Models\Zone;
use Illuminate\Support\Facades\Hash;

class ZoneUpdateAction
{
    public function __invoke(Zone $zone, array $data): ZoneResource
    {
        $updateData = [
            'name' => $data['name'],
            'email' => $data['email'],
        ];

        if (!empty($data['password'])) {
            $updateData['password'] = Hash::make($data['password']);
        }

        $zone->syncPermissions($data['permisos']);

        $zone->update($updateData);

        return ZoneResource::fromModel($zone->fresh());
    }
}
