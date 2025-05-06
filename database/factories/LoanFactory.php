<?php
namespace Database\Factories;

use Carbon\Carbon;
use Domain\Books\Models\Book;
use Domain\Loancases\Models\Loancase;
use Domain\Loans\Models\Loan;
use Domain\Genres\Models\Genre;
use Domain\Users\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class LoanFactory extends Factory
{
    protected $model = Loan::class;

    public function definition()
    {
        $user = User::all()->random()->id;
        $book = Book::all()->random()->id;

        return [

                'book_id' => $book,
                'user_id' => $user,
                'due_date' => Carbon::now()->addWeek(),
                'is_active' => true,
        ];
    }
}
