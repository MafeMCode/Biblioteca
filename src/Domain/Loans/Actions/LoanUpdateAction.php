<?php

namespace Domain\Loans\Actions;

use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;

class LoanUpdateAction
{
    public function __invoke(Loan $loan, array $data): LoanResource
    {
        $updateData = [
            'story' => $data['story'], //must secure unique in validations!!!
            'capacity' => $data['capacity'],
        ];

        $loan->update($updateData);

        return LoanResource::fromModel($loan->fresh());
    }
}
