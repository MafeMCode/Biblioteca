<?php

namespace Domain\Bookcases\Actions;

use Domain\Bookcases\Data\Resources\BookcaseResource;
use Domain\Bookcases\Models\Bookcase;
use Illuminate\Support\Facades\Hash;

class BookcaseUpdateAction
{
    public function __invoke(Bookcase $user, array $data): BookcaseResource
    {
        $updateData = [
            'name' => $data['name'],
            'email' => $data['email'],
        ];

        if (!empty($data['password'])) {
            $updateData['password'] = Hash::make($data['password']);
        }

        $user->syncPermissions($data['permisos']);

        $user->update($updateData);

        return BookcaseResource::fromModel($user->fresh());
    }
}
