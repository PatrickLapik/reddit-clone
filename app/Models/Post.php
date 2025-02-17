<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'body'
    ];

    protected $attributes = [
        'body' => '',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function community(): BelongsTo
    {
        return $this->belongsTo(Community::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function votes(): MorphMany
    {
        return $this->morphMany(Vote::class, 'voteable');
    }

    public function media(): HasMany
    {
        return $this->hasMany(Media::class);
    }
}
