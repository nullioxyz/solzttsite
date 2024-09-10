<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Social;

class SocialTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Social::create(
            [
                'name' => 'instagram',
                'url' => 'https://instagram.com/solztt'
            ]
        );

        Social::create(
            [
                'name' => 'facebook',
                'url' => 'https://www.facebook.com/solzztt'
            ]
        );
    }
}
