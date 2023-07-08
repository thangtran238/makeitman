<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $table = 'messages';


    protected $fillable = ['sender_id', 'recipient_id', 'content'];


    public function sender()
    {
        return $this->belongsTo(Obtainer::class, 'sender_id');
    }


    public function recipient()
    {
        return $this->belongsTo(Obtainer::class, 'recipient_id');
    }
}
