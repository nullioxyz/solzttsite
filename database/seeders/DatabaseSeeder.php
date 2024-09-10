<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\ContentTypeTableSeeder;
use Database\Seeders\LanguageTableSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        
        \App\Models\User::factory()->create([
             'name' => 'Dev user',
             'email' => 'dev@soztt.com',
             'password' => '#.!eb?f4l4na#2011'
         ]);

         \App\Models\User::factory()->create([
            'name' => 'Sol',
            'email' => 'solztt.br@gmail.com',
            'password' => 'password'
        ]);

        $this->call([
            ContentTypeTableSeeder::class,
            LanguageTableSeeder::class,
            CategoryTableSeeder::class,
            InstitucionalTableSeeder::class,
            PortfolioTableSeeder::class,
            AvailableDesignTableSeeder::class,
            ThemeTableSeeder::class,
            SiteSettingsTableSeeder::class,
            SocialTableSeeder::class
        ]);
    }
}
