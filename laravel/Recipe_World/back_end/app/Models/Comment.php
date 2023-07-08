<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $table = 'comments';


    protected $fillable = ['obtainer_id', 'post_id', 'content'];


    public function obtainer()
    {
        return $this->belongsTo(Obtainer::class, 'obtainer_id');
    }


    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }
}
