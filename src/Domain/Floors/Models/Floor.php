<?php

namespace Domain\Floors\Models;

use Domain\Zones\Models\Zone;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Floor extends Model
{
    use HasUuids;

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
