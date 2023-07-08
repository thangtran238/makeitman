<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\Obtainer;

class ObtainerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        for ($i = 0; $i < 20; $i++) {
            Obtainer::create([
                'email' => $faker->unique()->email,
                'password' => bcrypt('password'),
                'full_name' => $faker->name,
                'date_of_birth' => $faker->date(),
                'bio' => $faker->paragraph,
                'phone_number' => $faker->phoneNumber(),
                'isActive' => 1,
                'profile_image_url' => $faker->imageUrl(),
            ]);
        }
        


    }
}
