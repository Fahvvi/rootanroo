<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Testimonial extends Model
{
    use HasTranslations;

    protected $fillable = ['client_name', 'client_company', 'avatar', 'rating', 'quote'];

    public array $translatable = ['quote'];
}