<?php

namespace Domain\Users\Actions;

use App\Notifications\confirmacion_reserva;
use Domain\Users\Models\User;

class UserDestroyAction
{
    public function __invoke(User $user): void
    {
        $user->delete();
    }
}
