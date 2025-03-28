<?php

namespace Domain\Floors\Models;

use Database\Factories\FloorFactory;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Floor extends Model
{
    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return FloorFactory::new();
    }
    use HasUuids;
    use HasFactory;

    protected $fillable = [
        'id',
        'story',
        'capacity',
    ];

    public function zones(): HasMany
    {
        return $this->hasMany(Zone::class);
    }
}
