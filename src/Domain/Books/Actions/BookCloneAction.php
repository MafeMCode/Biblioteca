<?php

namespace Domain\Books\Actions;

use Domain\Bookcases\Models\Bookcase;
use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Domain\Zones\Models\Zone;

class BookCloneAction
{
    public function __invoke(Book $book): BookResource
    {

        $genreArray = explode(', ', $book->genres);

        $foundBookcase = Bookcase::with(['zone'])
            ->withCount('books')
            ->whereHas('zone', function ($query) use ($genreArray) {
                $query->whereIn('genreName', $genreArray);
            })
            ->get()
            ->filter(function ($bks) {
                return $bks->books_count < $bks->capacity;
            })
            ->pluck('id')
            ->random();

        $clone = Book::create([
            'title' => $book->title,
            'ISBN' => $book->ISBN,
            'author' => $book->author,
            'editor' => $book->editor,
            'length' => $book->length,
            'bookcase_id' => $foundBookcase,
            'genres' => $book->genres,
        ]);

        $clone->addMedia($book->getMedia('media')->first())->toMediaCollection('media');

        return BookResource::fromModel($clone);
    }
}
