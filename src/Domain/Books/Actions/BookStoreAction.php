<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\FileBag;
class BookStoreAction
{
    public function __invoke(array $data, FileBag $imagenes): BookResource
    {
        /*

        {
        "title":"Gatitos",
        "author":"Pablo",
        "editor":"Noah",
        "length":666,
        "bookcase_id":"0195eaee-36df-72f8-8731-69d62312f589",
        "generos":["Comedy","Drama","Romance"]
        }

        */

        $generos = implode(', ', $data['generos']);

        $book = Book::create([
            'title' => $data['title'],
            'author' => $data['author'],
            'editor' => $data['editor'],
            'length' => $data['length'],
            'bookcase_id' => $data['bookcase_id'],
            'genres' => $generos,
        ]);

        foreach ($imagenes as $imagen) {
            $book->addMedia($imagen)->toMediaCollection('media');
        };

        return BookResource::fromModel($book);
    }
}
