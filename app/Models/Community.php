<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Community extends Model
{
    /** @use HasFactory<\Database\Factories\CommunityFactory> */
    use HasFactory;

    protected $fillable = ['name', 'description', 'icon', 'banner'];

    protected $attributes = [
        'icon' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s',
        'banner' => 'https://www.guardianoffshore.com.au/wp-content/uploads/2015/03/banner-placeholder.jpg'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function joinedUser(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_joined_communities');
    }
}
