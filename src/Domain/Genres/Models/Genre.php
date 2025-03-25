<?php

namespace Domain\Genres\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    use HasUuids;

    protected $fillable = [
        'id',
        'name',
    ];
}
