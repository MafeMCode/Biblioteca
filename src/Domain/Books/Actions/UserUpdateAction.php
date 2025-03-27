<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Illuminate\Support\Facades\Hash;

class BookUpdateAction
{
    public function __invoke(Book $book, array $data): BookResource
    {
        $updateData = [
            'name' => $data['name'],
            'email' => $data['email'],
        ];

        if (!empty($data['password'])) {
            $updateData['password'] = Hash::make($data['password']);
        }

        $book->syncPermissions($data['permisos']);

        $book->update($updateData);

        return BookResource::fromModel($book->fresh());
    }
}
