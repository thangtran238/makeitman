<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HiddenPost extends Model
{
    use HasFactory;

    protected $fillable = ['hidden_post'];
    protected $table = "recipes";

    public function obtainers()
    {
        return $this->hasMany(Obtainer::class, 'id');
    }


    public function posts()
    {
        return $this->hasMany(Post::class, 'id');
    }
}
