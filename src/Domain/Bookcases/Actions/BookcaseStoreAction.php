<?php

namespace Domain\Bookcases\Actions;

use Domain\Bookcases\Data\Resources\BookcaseResource;
use Domain\Bookcases\Models\Bookcase;
use Illuminate\Support\Facades\Hash;

class BookcaseStoreAction
{
    public function __invoke(array $data): BookcaseResource
    {
        $user = Bookcase::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $user->syncPermissions($data['permisos']);

        return BookcaseResource::fromModel($user);
    }
}
