<?php

namespace Database\Factories;

use Domain\Bookcases\Models\Bookcase;
use Domain\Books\Models\Book;
use Domain\Genres\Models\Genre;
use Illuminate\Database\Eloquent\Factories\Factory;
use Domain\Books\Actions\ISBNGeneration;
use Domain\Zones\Models\Zone;

class BookFactory extends Factory
{
    protected $model = Book::class;

    public function definition()
    {
        $genres = Genre::all()->pluck('name');
        $genresArray = fake()->randomElements($array = $genres, $count = fake()->numberBetween(1, 2));
        $zonesInGenre = Zone::where('genreName', 'ILIKE', $genresArray[0])->pluck('id');

        $bookcase = Bookcase::query()
        ->whereIn('zone_id', $zonesInGenre)
    ->get()
    ->first()
        ->id;

        $title = $this->faker->streetName;
        $Otitle = $title;
        $author = $this->faker->name;
        $Oauthor = $author;
        $editor = $this->faker->company;
        $Oeditor = $editor;

        // Title number gen

        $title = strtolower($title);

        $title = preg_replace('/[^a-z0-9]/', '', $title);

        $numTitle = 0;

        for ($pos = 0; $pos < strlen($title); $pos++) {
            $byte = substr($title, $pos);
            $byte = ord($byte);
            $numTitle += $byte;
        }

        $numTitle = substr(strval(intval($numTitle)), -3);

        $ISBNTitle = $numTitle;

        // Author number gen

        $author = strtolower($author);

        $author = preg_replace('/[^a-z0-9]/', '', $author);

        $numAuthor = 0;

        for ($pos = 0; $pos < strlen($author); $pos++) {
            $byte = substr($author, $pos);
            $byte = ord($byte);
            $numAuthor += $byte;
        }

        $numAuthor = substr(strval(intval($numAuthor)), -3);

        $ISBNAuthor = $numAuthor;

        // Editor number gen

        $editor = strtolower($editor);

        $editor = preg_replace('/[^a-z0-9]/', '', $editor);

        $numEditor = 0;

        for ($pos = 0; $pos < strlen($editor); $pos++) {
            $byte = substr($editor, $pos);
            $byte = ord($byte);
            $numEditor += $byte;
        }

        $numEditor = substr(strval(intval($numEditor)), -3);

        $ISBNEditor = $numEditor;

        $ISBN = '9784' . $ISBNTitle . $ISBNAuthor . $ISBNEditor;

        return [

            'title' => $Otitle,
            'author' => $Oauthor,
            'genres' => implode(', ', $genresArray),
            'length' => $this->faker->numberBetween(300, 900),
            'editor' => $Oeditor,
            'bookcase_id' => $bookcase,
            'ISBN' => $ISBN

        ];
    }
}
