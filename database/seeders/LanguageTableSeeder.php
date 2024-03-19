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
                'logo' => 'brazil.png',
                'slug' => 'pt-br'
            ]
        );

        Language::create(
            [
                'name' => 'Italiano',
                'logo' => 'italy.png',
                'slug' => 'it'
            ]
        );
        
        Language::create(
            [
                'name' => 'English',
                'logo' => 'english.png',
                'slug' => 'english'
            ]
        );
    }
}
