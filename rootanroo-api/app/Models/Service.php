<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Service extends Model
{
    use HasTranslations;

    protected $fillable = ['icon', 'sort_order', 'title', 'description'];

    public array $translatable = ['title', 'description'];
}
