<?php

namespace App\Zones\Controllers;

use App\Core\Controllers\Controller;
use Domain\Floors\Models\Floor;
use Domain\Genres\Models\Genre;
use Domain\Zones\Actions\ZoneDestroyAction;
use Domain\Zones\Actions\ZoneStoreAction;
use Domain\Zones\Actions\ZoneUpdateAction;
use Domain\Zones\Models\Zone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ZoneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('zones/Index', []);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $floors = Floor::select('id', 'story')->get()->toArray();
        $genres = Genre::select('id', 'name')->get()->toArray();

        return Inertia::render('zones/Create', ['floors' => $floors, 'genres' => $genres]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, ZoneStoreAction $action)
    {

        $validator = Validator::make($request->all(), [
            'number' => [
                'required',
                'integer',
                Rule::unique('zones')->where(fn ($query) =>
                    $query->where('floor_id', $request->floor_id)
                ),
            ],
            'floor_id' => ['required', 'string'],
            'capacity' => ['required', 'integer'],
            'genre' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('zones.index')
            ->with('success', __('messages.zones.created'));
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
    public function edit(Request $request, Zone $zone)
    {
        $floors = Floor::select('id', 'story')->get()->toArray();
        $genres = Genre::select('id', 'name')->get()->toArray();

        return Inertia::render('zones/Edit', [
            'zone' => $zone,
            'floors' => $floors,
            'genres' => $genres,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Zone $zone, ZoneUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'number' => [
            'required',
            'integer',
            Rule::unique('zones')->where(fn ($query) =>
                $query->where('floor_id', $request->floor_id)
            ),
    ],
            'floor_id' => ['required', 'string'],
            'capacity' => ['required', 'integer'],
            'genre' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($zone, $validator->validated());

        $redirectUrl = route('zones.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.zones.updated'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Zone $zone, ZoneDestroyAction $action)
    {
        $action($zone);

        return redirect()->route('zones.index')
            ->with('success', __('messages.zones.deleted'));
    }
}
