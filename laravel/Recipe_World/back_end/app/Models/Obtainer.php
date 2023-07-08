<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Obtainer extends Model
{
    use HasFactory;

    protected $table = 'obtainers';


    protected $fillable = ['email', 'password', 'phone_number', 'location', 'website', 'full_name', 'date_of_birth', 'bio', 'profile_image_url'];


    public function posts()
    {
        return $this->hasMany(Post::class, 'obtainers_id');
    }


    public function comments()
    {
        return $this->hasMany(Comment::class, 'obtainer_id');
    }


    public function likes()
    {
        return $this->hasMany(Like::class, 'obtainer_id');
    }

    public function followers()
    {
        return $this->hasMany(Follower::class, 'obtainers_id');
    }

    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }


    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'recipient_id');
    }


    public function orderSellers()
    {
        return $this->hasMany(OrderSeller::class, 'seller_id');
    }


    public function orderBuyers()
    {
        return $this->hasMany(OrderBuyer::class, 'buyer_id');
    }
}
