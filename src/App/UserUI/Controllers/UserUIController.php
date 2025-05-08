<?php

namespace App\UserUI\Controllers;

use App\Core\Controllers\Controller;
use Carbon\Carbon;
use Domain\Floors\Models\Floor;
use Domain\Loans\Actions\LoanStoreAction;
use Domain\Loans\Actions\LoanUpdateAction;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserUIController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $floors = Floor::with(['zones' => function ($query) {
            $query->orderBy('number', 'asc')->with(['bookcases' => function ($query) {
                $query->orderBy('number', 'asc')->with(['books' => function ($query) {
                    $query->orderBy('created_at');
                }])->withCount('books');
            }])->withCount('bookcases');;
        }])
            ->withCount('zones')
            ->get();

            $floors->each(function ($floor) {
                $floor->zones->each(function ($zone) {
                    $zone->bookcases->each(function ($bookcase) {
                        $bookcase->books->each(function ($book) {
                            $book->imgURL = $book->getFirstMediaUrl('media') ?? null;
                        });
                    });
                });
            })
            ->toArray();


        $lang = Auth::user()->settings ? Auth::user()->settings->preferences['locale'] : 'en';

        return Inertia::render('unrelated/UserUI', ['lang' => $lang, 'floors' => $floors]);
    }
}
