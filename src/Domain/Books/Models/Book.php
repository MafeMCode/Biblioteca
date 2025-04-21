<?php

namespace Domain\Books\Models;

use Database\Factories\BookFactory;
use Domain\Bookcases\Models\Bookcase;
use Domain\Genres\Models\Genre;
use Domain\Loans\Models\Loan;
use Domain\Reservations\Models\Reservation;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Book extends Model implements HasMedia
{
    use InteractsWithMedia, SoftDeletes;
    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return BookFactory::new();
    }
    use HasUuids;
    use HasFactory;

    protected $fillable = [
        'id',
        'title',
        'ISBN',
        'genres',
        'author',
        'length',
        'editor',
        'bookcase_id',
    ];

    public function bookcase(): BelongsTo
    {
        return $this->belongsTo(Bookcase::class);
    }

    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'book_genre', 'book_id', 'genre_id');
    }

    public function loans(): HasMany
    {
        return $this->hasMany(Loan::class);
    }

    public function activeLoan(): HasOne
    {
        return $this->hasOne(Loan::class)->where('is_active', true);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}
