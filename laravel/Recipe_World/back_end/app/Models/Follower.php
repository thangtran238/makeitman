<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Follower extends Model
{
    use HasFactory;

    protected $table = 'followers';


    protected $fillable = ['obtainers_id', 'follower_obtainers_id'];


    public function obtainer()
    {
        return $this->belongsTo(Obtainer::class, 'obtainers_id');
    }


    public function follower()
    {
        return $this->belongsTo(Obtainer::class, 'follower_obtainers_id');
    }
}
