<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Illuminate\Support\Facades\Hash;

class BookStoreAction
{
    public function __invoke(array $data): BookResource
    {
        $book = Book::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        return BookResource::fromModel($book);
    }
}
