<?php
namespace Database\Factories;

use Carbon\Carbon;
use Domain\Books\Models\Book;
use Domain\Loancases\Models\Loancase;
use Domain\Loans\Models\Loan;
use Domain\Genres\Models\Genre;
use Domain\Reservations\Models\Reservation;
use Domain\Users\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReservationFactory extends Factory
{
    protected $model = Reservation::class;

    public function definition()
    {
        $user = User::all()->random()->id;
        $book = Book::all()->random()->id;

        return [

                'book_id' => $book,  // Must secure unique in validations!!!
                'user_id' => $user,
        ];
    }
}
