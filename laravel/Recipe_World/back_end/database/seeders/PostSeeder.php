<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\Post;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        for ($i = 0; $i < 20; $i++) {
            Post::create([
                'obtainer_id' => $i + 1,
                'category_id' => $faker->numberBetween(1, 3),
                'name' => $faker->sentence,
                'instruction' => $faker->sentence,
                'preparetion_time' => $faker->randomNumber(),
                'cooking_time' => $faker->randomNumber(),
                'description' => $faker->paragraph,
                'ingredients' => $faker->paragraph,
                'thumbnail' => $faker->imageUrl(),
                'price' => $faker->randomNumber()
            ]);
        }
    }
}
