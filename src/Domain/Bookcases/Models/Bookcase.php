<?php

namespace Domain\Bookcases\Models;

use Domain\Books\Models\Book;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bookcase extends Model
{
    protected $fillable = [
        'id',
        'capacity',
        'zone',
    ];

    public function books(): HasMany
    {
        return $this->hasMany(Book::class);
    }

    public function zone(): BelongsTo
    {
        return $this->belongsTo(Zone::class);
    }
}
