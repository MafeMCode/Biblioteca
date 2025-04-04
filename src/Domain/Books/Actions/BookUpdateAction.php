<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\FileBag;

class BookUpdateAction
{
    public function __invoke(Book $book, array $data, FileBag $imagenes): BookResource
    {


        $updateData = [
            'title' => $data['title'],
            'author' => $data['author'],
            'editor' => $data['editor'],
            'length' => $data['length'],
            'bookcase_id' => $data['bookcase_id'],
            'genres' => $data['generos'],
        ];

        $book->update($updateData);

            foreach ($imagenes as $imagen) {
                $book->getMedia('media')[0]->delete();

                $book->addMedia($imagen)->toMediaCollection('media');
            };

        return BookResource::fromModel($book->fresh());
    }
}
