<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Project extends Model
{
    use HasTranslations;

    protected $fillable = [
        'slug', 'category', 'status', 'title', 'description', 
        'tech_stack', 'featured', 'sort_order', 'external_url'
    ];

    public array $translatable = ['title', 'description'];

    protected $casts = [
        'tech_stack' => 'array',
        'featured' => 'boolean',
    ];
}