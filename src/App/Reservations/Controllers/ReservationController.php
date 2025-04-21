<?php

namespace App\Reservations\Controllers;

use App\Core\Controllers\Controller;
use Domain\Reservations\Actions\ReservationStoreAction;
use Domain\Users\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, ReservationStoreAction $action)
    {
        $user_id = User::where('email', 'like', $request['userMail']);

        $validator = Validator::make($request->all(), [
            'book_id' => [
                'required',
                Rule::unique('reservations')
                    ->where(
                        fn($query) => $query
                            ->where('book_id', $request->book_id)
                            ->where('user_id', $user_id)
                    ),
            ],
            'userMail' => ['required', 'string'],
        ]);


        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('books.index')
            ->with('success', __('messages.reservation.created'));
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
