<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Database\Factories\ProjectFactory;
use Database\Factories\TaskFactory;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@gmail.com',
            'password' => bcrypt('11111111'),
            'email_verified_at' => now(),
        ]);

        Project::factory()->count(25)->hasTasks(15)->create();
    }
}
