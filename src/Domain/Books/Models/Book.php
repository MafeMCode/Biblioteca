<?php

namespace Domain\Books\Models;

use Domain\Bookcases\Models\Bookcase;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Book extends Model
{
    use HasUuids;

    protected $fillable = [
        'id',
        'title',
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
}
