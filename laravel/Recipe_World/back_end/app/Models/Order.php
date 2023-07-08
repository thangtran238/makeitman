<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Obtainer;
use App\Models\Post;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';


    protected $fillable = ['sender_id', 'recipient_id', 'post_id', 'status'];
    public function sender()
    {
        return $this->belongsTo(Obtainer::class, 'sender_id');
    }
    public function recipient()
    {
        return $this->belongsTo(Obtainer::class, 'recipient_id');
    }
    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }
}
