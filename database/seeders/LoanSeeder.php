<?php

namespace Database\Seeders;

use Domain\Loans\Models\Loan;
use Illuminate\Database\Seeder;

class LoanSeeder extends Seeder
{
    public function run()
    {
        // Insert specific data

        Loan::factory(50)->create();

    }
}
