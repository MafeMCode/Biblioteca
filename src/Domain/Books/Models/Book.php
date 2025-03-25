<?php

namespace Domain\Books\Models;

use Domain\Bookcases\Models\Bookcase;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Book extends Model
{
    protected $fillable = [
        'id',
        'title',
        'genre',
        'author',
        'length',
        'editor',
        'location',
    ];

    public function bookcase(): BelongsTo
    {
        return $this->belongsTo(Bookcase::class);
    }
}
