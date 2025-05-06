<?php

namespace Domain\Reservations\Models;

use Database\Factories\ReservationFactory;
use Domain\Books\Models\Book;
use Domain\Users\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reservation extends Model
{
    /**
         * Create a new factory instance for the model.
         */
        protected static function newFactory()
        {
            return ReservationFactory::new();
        }
    use HasUuids, SoftDeletes, HasFactory;
    protected $fillable = [
        'id',
        'user_id',
        'book_id',
    ];

    public function user(): BelongsTo
    {
        return $this->BelongsTo(User::class)->withTrashed();
    }

    public function book(): BelongsTo
    {
        return $this->BelongsTo(Book::class)->withTrashed();
    }
}
