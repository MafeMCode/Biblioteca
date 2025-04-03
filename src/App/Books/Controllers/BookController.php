<?php

namespace App\Books\Controllers;

use App\Core\Controllers\Controller;
use Domain\Books\Actions\BookStoreAction;
use Domain\Books\Actions\BookUpdateAction;
use Domain\Books\Models\Book;
use Domain\Bookcases\Models\Bookcase;
use Domain\Floors\Models\Floor;
use Domain\Genres\Models\Genre;
use Domain\Zones\Models\Zone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
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
        $floors = Floor::select('id', 'story')->orderBy('story', 'asc')->get()->toArray();
        $zones = Zone::select('id', 'number', 'genreName', 'floor_id')->orderBy('genreName', 'asc')->get()->toArray();
        $bookcases = Bookcase::withCount('books')->get()->toArray();

        $genres = Genre::select('name')->get()->map(function ($genre) {
            return [
                'value' => $genre->name,
            ];
        })->toArray();

        return Inertia::render('books/Create', ['genres' => $genres, 'floors' => $floors, 'zones' => $zones, 'bookcases' => $bookcases]);
    }

    public function store(Request $request, BookStoreAction $action)
    {

        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string'],
            'author' => ['required', 'string'],
            'editor' => ['required', 'string'],
            'length' => ['required', 'integer', 'min:1'],
            'bookcase_id' => ['required', 'string'],
            'generos' => ['required']
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('books.index')
            ->with('success', __('messages.books.created'));
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

        $floors = Floor::select('id', 'story')->orderBy('story', 'asc')->get()->toArray();
        $zones = Zone::select('id', 'number', 'genreName', 'floor_id')->orderBy('genreName', 'asc')->get()->toArray();
        $bookcases = Book::withCount('books')->get()->toArray();

        $genresExplosion = explode(', ', $book->genres);

        return Inertia::render('books/Edit', [
            'book' => $book,
            'genres' => $genres,
            'floors' => $floors,
            'zones' => $zones,
            'bookcases' => $bookcases,
            'explosion' => $genresExplosion,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book, BookUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'number' => [
                'required',
                'integer',
                Rule::unique('bookcases')->where(
                    fn($query) =>
                    $query->where('zone_id', $request->zone_id)
                )->ignore($request->id),
            ],
            'zone_id' => ['required', 'string'],
            'capacity' => ['required', 'integer'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($book, $validator->validated());


        $redirectUrl = route('books.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.bookcases.updated'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
