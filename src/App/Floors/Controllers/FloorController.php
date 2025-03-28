<?php

namespace App\Floors\Controllers;

use App\Core\Controllers\Controller;
use Domain\Floors\Actions\FloorDestroyAction;
use Domain\Floors\Actions\FloorStoreAction;
use Domain\Floors\Models\Floor;
use Domain\Genres\Models\Genre;
use Domain\Floors\Actions\FloorUpdateAction;
use Domain\Users\Actions\UserStoreAction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class FloorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $genres = Genre::all()->pluck('name')->toJson();
        // $floors = Floor::orderBy('story')->get();

        $floors = Floor::withCount('zones')
            ->orderBy('story')
            ->get()
            ->map(fn(Floor $floor) => [
                'id' => $floor->id,
                'story' => $floor->story,
                'capacity' => $floor->capacity,
                'count' => $floor->zones_count,
            ])->toArray();

        return Inertia::render('floors/Index', ['floors' => $floors]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('floors/Create', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, FloorStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'story' => ['required', 'integer', 'unique:floors,story'],
            'capacity' => ['required', 'integer'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('floors.index')
            ->with('success', __('messages.floors.created'));
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
    public function edit(Request $request, Floor $floor)
    {
        return Inertia::render('floors/Edit', [
            'floor' => $floor,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Floor $floor, FloorUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'story' => ['required', 'integer', 'unique:floors,story'],
            'capacity' => ['required', 'integer'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($floor, $validator->validated());

        $redirectUrl = route('floors.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.floors.updated'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Floor $floor, FloorDestroyAction $action)
    {
        $action($floor);

        return redirect()->route('floors.index')
            ->with('success', __('messages.floors.deleted'));
    }
}
