<?php

namespace App\Reservations\Controllers;

use App\Core\Controllers\Controller;
use Domain\Reservations\Actions\ReservationStoreAction;
use Domain\Users\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('reports.view');
        $lang = Auth::user()->settings ? Auth::user()->settings->preferences['locale'] : 'en';

        return Inertia::render('reservations/Index', ['lang' => $lang]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('reports.view');
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, ReservationStoreAction $action)
    {
        Gate::authorize('reports.view');

        $user_id = User::where('email', 'like', $request['userMail'])->first()->id;

        $validator = Validator::make($request->all(), [
            'bookID' => [
                'required',
                // Rule::unique('reservations')
                //     ->where(
                //         fn($query) => $query
                //             ->where('book_id', $request->book_id)
                //             ->where('user_id', $user_id)
                //     ),
            ],
            'userMail' => ['required'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        // dd($request);

        $action($validator->validated());

        return redirect()->route('books.index')
            ->with('success', __('messages.reservations.created'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        Gate::authorize('reports.view');
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        Gate::authorize('reports.view');
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        Gate::authorize('reports.view');
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Gate::authorize('reports.view');
        //
    }
}
