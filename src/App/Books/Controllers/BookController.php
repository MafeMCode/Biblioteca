<?php

namespace App\Books\Controllers;

use App\Core\Controllers\Controller;
use Domain\Books\Models\Book;
use Domain\Genres\Models\Genre;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return Inertia::render('books/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $genres = Genre::select('name')->get()->map(function ($genre) {
            return [
                'value' => $genre->name,
            ];
        })->toArray();

        return Inertia::render('books/Create', ['genres' => $genres]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Book $book)
    {
        $genres = Genre::select('name')->get()->map(function ($genre) {
            return [
                'value' => $genre->name,
            ];
        })->toArray();

        $genresExplosion = explode(', ', $book->genres);

        return Inertia::render('books/Edit', [
            'book' => $book,
            'genres' => $genres,
            'explosion' => $genresExplosion,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        dd($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
