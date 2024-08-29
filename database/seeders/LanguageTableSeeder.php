<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Language;

class LanguageTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Language::create(
            [
                'name' => 'Português Brasil',
                'slug' => 'pt'
            ]
        );

        Language::create(
            [
                'name' => 'Italiano',
                'slug' => 'it'
            ]
        );
        
        Language::create(
            [
                'name' => 'English',
                'slug' => 'en'
            ]
        );
    }
}
