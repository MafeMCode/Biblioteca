<?php

namespace Domain\Zones\Models;

use Domain\Floors\Models\Floor;
use Domain\Bookcases\Models\Bookcase;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Zone extends Model
{
    use HasUuids;

    protected $fillable = [
        'id',
        'genre',
        'capacity',
        'floor_id',
    ];

    public function bookcases(): HasMany
    {
        return $this->hasMany(Bookcase::class);
    }

    public function floor(): BelongsTo
    {
        return $this->belongsTo(Floor::class);
    }

}
