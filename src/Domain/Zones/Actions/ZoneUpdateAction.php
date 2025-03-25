<?php

namespace Domain\Users\Actions;

use Domain\Users\Data\Resources\UserResource;
use Domain\Zones\Models\Zone;
use Illuminate\Support\Facades\Hash;

// class UserUpdateAction
// {
//     public function __invoke(Zone $zone, array $data): UserResource
//     {
//         $updateData = [
//             'name' => $data['name'],
//             'email' => $data['email'],
//         ];

//         if (!empty($data['password'])) {
//             $updateData['password'] = Hash::make($data['password']);
//         }

//         $user->syncPermissions($data['permisos']);

//         $user->update($updateData);

//         return UserResource::fromModel($user->fresh());
//     }
// }
