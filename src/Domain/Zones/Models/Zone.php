<?php

namespace Domain\Zones\Models;

use Database\Factories\ZoneFactory;
use Domain\Floors\Models\Floor;
use Domain\Bookcases\Models\Bookcase;
use Domain\Genres\Models\Genre;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Zone extends Model
{
    use HasUuids;
    use HasFactory;

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return ZoneFactory::new();
    }

    protected $fillable = [
        'id',
        'genre',
        'genreName',
        'number',
        'capacity',
        'floor_id',
    ];

    public function bookcases(): HasMany
    {
        return $this->hasMany(Bookcase::class);
    }

    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Genre::class);
    }

    public function floor(): BelongsTo
    {
        return $this->belongsTo(Floor::class);
    }

}
