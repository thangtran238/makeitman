<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\Order;
class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        for ($i = 0; $i < 20; $i++) {
            Order::create([
                'order_seller_id' => $faker->numberBetween(1, 20),
                'order_buyer_id' => $faker->numberBetween(1, 3),
                'price' => $faker->numberBetween(70000, 150000),
                'status' => 1,
            ]);
        }
    }
}
