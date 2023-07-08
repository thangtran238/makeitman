<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $table = 'posts';

    // Các trường fillable

    protected $fillable = ['obtainer_id', 'category_id','title', 'content', 'price', 'thumbnail'];

    public function category() {
        return $this->belongsTo(Category::class, 'category_id');
    }
    // Quan hệ nhiều-bài viết thuộc về một-người dùng
    public function obtainer()
    {
        return $this->belongsTo(Obtainer::class, 'obtainer_id');
    }

    // Quan hệ một-bài viết có nhiều-bình luận
    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id');
    }

    // Quan hệ một-bài viết có nhiều-like
    public function likes()
    {
        return $this->hasMany(Like::class, 'post_id');
    }

    // Quan hệ một-bài viết thuộc về nhiều-tag
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'post_tag', 'post_id', 'tag_id');
    }


    public function orderSellers()
    {
        return $this->hasMany(Obtainer::class, 'id');
    }


    public function orderBuyers()
    {
        return $this->hasMany(Obtainer::class, 'id');
    }
}
