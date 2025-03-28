<?php

namespace Domain\Books\Data\Resources;

use Domain\Bookcases\Models\Bookcase;
use Domain\Books\Models\Book;
use Domain\Floors\Models\Floor;
use Domain\Zones\Models\Zone;
use Spatie\LaravelData\Data;

class BookResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $title,
        public readonly string $genres,
        public readonly string $author,
        public readonly int $length,
        public readonly string $editor,
        public readonly int $bookcase_id,
        public readonly int $zone_id,
        public readonly int $floor_id,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Book $book): self
    {
        $estante = Bookcase::find($book->bookcase_id);
        $numeroEstante = $estante->number;

        $zona = Zone::find($estante->zone_id);
        $numeroZona = $zona->number;

        $piso = Floor::find($zona->floor_id);
        $story = $piso->story;

        return new self(
            id: $book->id,
            title: $book->title,
            genres: $book->genres,
            author: $book->author,
            length: $book->length,
            editor: $book->editor,
            bookcase_id: $numeroEstante,
            zone_id: $numeroZona,
            floor_id: $story,
            created_at: $book->created_at->format('Y-m-d H:i:s'),
            updated_at: $book->updated_at->format('Y-m-d H:i:s'),
        );
    }
}
