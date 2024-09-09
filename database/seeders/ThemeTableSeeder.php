<?php

namespace Database\Seeders;

use App\Models\Theme;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ThemeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Theme::create([
            'slug' => 'default',
            'title' => 'Default theme'
        ]);

        Theme::create([
            'slug' => 'dark-theme',
            'title' => 'Dark theme'
        ]);

        Theme::create([
            'slug' => 'light-theme',
            'title' => 'Light theme'
        ]);
    }
}
