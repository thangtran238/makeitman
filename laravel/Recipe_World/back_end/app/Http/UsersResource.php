<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UsersResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            // Define the resource's attributes here
            'id' => $this->id,
            'name' => $this->name,
            // Add more attributes as needed
        ];
    }
}
