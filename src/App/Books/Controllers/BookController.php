<?php

namespace App\Books\Controllers;

use App\Core\Controllers\Controller;
use Domain\Books\Actions\BookStoreAction;
use Domain\Books\Actions\BookUpdateAction;
use Domain\Books\Models\Book;
use Domain\Bookcases\Models\Bookcase;
use Domain\Books\Actions\BookDestroyAction;
use Domain\Books\Actions\ISBNGeneration;
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
        $floor_numbers = Floor::all()->pluck('story')->map(function ($story) {
            return [
                'label' => $story,
                'value' => $story,
            ];
        })->toArray();
        $zone_numbers = Zone::orderBy('number')->distinct()->pluck('number')->map(function ($number) {
            return [
                'label' => $number,
                'value' => $number,
            ];
        })->toArray();
        $bookcase_numbers = Bookcase::orderBy('number')->distinct()->pluck('number')->map(function ($number) {
            return [
                'label' => $number,
                'value' => $number,
            ];
        })->toArray();

        return Inertia::render('books/Index', ['floor_list' => $floor_numbers, 'zone_list' => $zone_numbers, 'bookcase_list' => $bookcase_numbers]);
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

    public function store(Request $request, BookStoreAction $action, ISBNGeneration $ISBNG)
    {

        $request['ISBN'] = $ISBNG($request['title'], $request['author'], $request['editor']);

        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string'],
            'author' => ['required', 'string'],
            'ISBN' => ['string'],
            'editor' => ['required', 'string'],
            'length' => ['required', 'integer', 'min:1'],
            'bookcase_id' => ['required', 'string'],
            'generos' => ['required'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated(), $request->files);

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
        $bookcases = Bookcase::withCount('books')->get()->toArray();

        $genresExplosion = explode(', ', $book->genres);

        $imagen = $book->getMedia('media')[0]->getUrl();

        // dd($imagen);

        return Inertia::render('books/Edit', [
            'book' => $book,
            'genres' => $genres,
            'floors' => $floors,
            'zones' => $zones,
            'imgPreviaUrl' => $imagen,
            'bookcases' => $bookcases,
            'explosion' => $genresExplosion,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book, BookUpdateAction $action, ISBNGeneration $ISBNG)
    {

        $title = $request['title'] ? $request['title'] : $book->title;
        $author = $request['author'] ? $request['author'] : $book->author;
        $editor = $request['editor'] ? $request['editor'] : $book->editor;

        $request['ISBN'] = $ISBNG($title, $author, $editor);

        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string'],
            'author' => ['required', 'string'],
            'ISBN' => ['string'],
            'editor' => ['required', 'string'],
            'length' => ['required', 'integer', 'min:1'],
            'bookcase_id' => ['required', 'string'],
            'generos' => ['required'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($book, $validator->validated(), $request->files);

        $redirectUrl = route('books.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.books.updated'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book, BookDestroyAction $action)
    {
        $action($book);

        return redirect()->route('books.index')
            ->with('success', __('messages.books.deleted'));
    }
}
