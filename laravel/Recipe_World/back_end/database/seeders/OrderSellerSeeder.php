<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\OrderSeller;

class OrderSellerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        for ($i = 0; $i < 20; $i++) {
            OrderSeller::create([
                'seller_id' => $i + 1,
                'post_id' => $faker->numberBetween(1, 20),
            ]);
        }
    }
}
