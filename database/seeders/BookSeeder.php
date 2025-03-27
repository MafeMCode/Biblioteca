<?php

namespace Database\Seeders;

use Domain\Books\Models\Book;
use Domain\Bookcases\Models\Bookcase;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    public function run()
    {
        // Insert specific data
        Book::create([
            'title' => "testBook",
            'genres' => "Terror, Fantasía, Drama, Suspense",
            'author' => 'Roberto Alejandro',
            'editor' => 'Yo, claramente',
            'bookcase_id' => Bookcase::all()->random()->id,
            'length' => 999,
        ]);
        Book::create([
            'title' => "testBook",
            'genres' => "Terror, Fantasía, Drama, Suspense",
            'author' => 'Roberto Alejandro',
            'editor' => 'Yo, claramente',
            'bookcase_id' => Bookcase::all()->random()->id,
            'length' => 999,
        ]);
        Book::create([
            'title' => "testBook",
            'genres' => "Terror, Fantasía, Drama, Suspense",
            'author' => 'Roberto Alejandro',
            'editor' => 'Yo, claramente',
            'bookcase_id' => Bookcase::all()->random()->id,
            'length' => 999,
        ]);
        Book::create([
            'title' => "testBook",
            'genres' => "Terror, Fantasía, Drama, Suspense",
            'author' => 'Roberto Alejandro',
            'editor' => 'Yo, claramente',
            'bookcase_id' => Bookcase::all()->random()->id,
            'length' => 999,
        ]);
        Book::create([
            'title' => "testBook",
            'genres' => "Terror, Fantasía, Drama, Suspense",
            'author' => 'Roberto Alejandro',
            'editor' => 'Yo, claramente',
            'bookcase_id' => Bookcase::all()->random()->id,
            'length' => 999,
        ]);
        Book::create([
            'title' => "testBook",
            'genres' => "Terror, Fantasía, Drama, Suspense",
            'author' => 'Roberto Alejandro',
            'editor' => 'Yo, claramente',
            'bookcase_id' => Bookcase::all()->random()->id,
            'length' => 999,
        ]);

    }
}
