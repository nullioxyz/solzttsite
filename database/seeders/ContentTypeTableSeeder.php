<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ContentType;

class ContentTypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ContentType::create(
            [
                'name' => 'tattoo'
            ]
        );

        ContentType::create(
            [
                'name' => 'painting'
            ]
        );
    }
}
