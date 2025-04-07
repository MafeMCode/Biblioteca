<?php

namespace Domain\Floors\Models;

use Domain\Books\Models\Book;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Floor extends Model
{
    use HasUuids;

    protected $fillable = [
        'id',
        'fecha_inicio',
        'fecha_fin',
        'status',
    ];

    public function users(): HasOne
    {
        return $this->hasOne(User::class);
    }

    public function books(): HasOne
    {
        return $this->hasOne(Book::class);
    }
}
