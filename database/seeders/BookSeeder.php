<?php

namespace Database\Seeders;

use Domain\Books\Models\Book;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    public function run()
    {
        // Insert specific data

        Book::factory(350)->create();

        $books = Book::all();

        foreach ($books as $book) {
            // $book->addMediaFromUrl('https://img.freepik.com/free-vector/abstract-elegant-winter-book-cover_23-2148798745.jpg')->toMediaCollection('media');
        }

    }
}
