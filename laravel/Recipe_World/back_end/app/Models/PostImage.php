<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostImage extends Model
{
    use HasFactory;

    protected $table = 'post_images';

    protected $fillable = ['post_id', 'image_url'];

    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }
}
