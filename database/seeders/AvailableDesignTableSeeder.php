<?php

namespace Database\Seeders;

use App\Models\Language;
use App\Models\AvailableDesign;
use App\Models\AvailableDesignLang;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class AvailableDesignTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $languages = Language::get();

        $available1 = AvailableDesign::create([
            'slug' => 'available-design-1',
            'category_id' => 1,
            'active' => 1,
            'available' => 1
        ]);

        $available2 = AvailableDesign::create([
            'slug' => 'available-design-2',
            'category_id' => 2,
            'active' => 1,
            'available' => 1
        ]);

        $available3 = AvailableDesign::create([
            'slug' => 'available-design-3',
            'category_id' => 3,
            'active' => 1,
            'available' => 1
        ]);

        $available4 = AvailableDesign::create([
            'slug' => 'available-design-4',
            'category_id' => 1,
            'active' => 1,
            'available' => 1
        ]);

        $available5 = AvailableDesign::create([
            'slug' => 'available-design-5',
            'category_id' => 2,
            'active' => 0,
            'available' => 1
        ]);

        foreach ($languages as $lang) {
            if ($lang->slug == 'pt') {
                AvailableDesignLang::insert(
                    [
                        // 1 
                        [
                            'available_design_id' => $available1->id,
                            'language_id' => $lang->id,
                            'title' => 'Desenho disponivel 1',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Desenho disponivel 1'),
                        ],
                        // 2
                        [
                            'available_design_id' => $available2->id,
                            'language_id' => $lang->id,
                            'title' => 'Desenho disponivel 2',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Desenho disponivel 2'),
                        ],

                        [
                            'available_design_id' => $available3->id,
                            'language_id' => $lang->id,
                            'title' => 'Desenho disponivel 3',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Desenho disponivel 3'),
                        ],

                        [
                            'available_design_id' => $available4->id,
                            'language_id' => $lang->id,
                            'title' => 'Desenho disponivel 4',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Desenho disponivel 4'),
                        ],

                        [
                            'available_design_id' => $available5->id,
                            'language_id' => $lang->id,
                            'title' => 'Desenho disponivel 5',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Desenho disponivel 5'),
                        ],
                    ]
                );
            }

            if ($lang->slug == 'it') {
                AvailableDesignLang::insert(
                    [
                        // 1 
                        [
                            'available_design_id' => $available1->id,
                            'language_id' => $lang->id,
                            'title' => 'Disegno disponibile 1',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Disegno disponibile 1 it'),
                        ],
                        // 2
                        [
                            'available_design_id' => $available2->id,
                            'language_id' => $lang->id,
                            'title' => 'Disegno disponibile 2',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Disegno disponibile 2 it'),
                        ],

                        [
                            'available_design_id' => $available3->id,
                            'language_id' => $lang->id,
                            'title' => 'Disegno disponibile 3',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Disegno disponibile 3 it'),
                        ],

                        [
                            'available_design_id' => $available4->id,
                            'language_id' => $lang->id,
                            'title' => 'Disegno disponibile 4',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Disegno disponibile 4 it'),
                        ],

                        [
                            'available_design_id' => $available5->id,
                            'language_id' => $lang->id,
                            'title' => 'Disegno disponibile 5',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Disegno disponibile 5 it'),
                        ],
                    ]
                );
            }

            if ($lang->slug == 'en') {
                AvailableDesignLang::insert(
                    [
                        // 1 
                        [
                            'available_design_id' => $available1->id,
                            'language_id' => $lang->id,
                            'title' => 'Available design 1',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Available design 1 english'),
                        ],
                        // 2
                        [
                            'available_design_id' => $available2->id,
                            'language_id' => $lang->id,
                            'title' => 'Available design 2',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Available design 2 english'),
                        ],

                        [
                            'available_design_id' => $available3->id,
                            'language_id' => $lang->id,
                            'title' => 'Available design 3',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Available design 3 english'),
                        ],

                        [
                            'available_design_id' => $available4->id,
                            'language_id' => $lang->id,
                            'title' => 'Available design 4',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Available design 4 english'),
                        ],

                        [
                            'available_design_id' => $available5->id,
                            'language_id' => $lang->id,
                            'title' => 'Available design 5',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Available design 5 english'),
                        ],
                    ]
                );
            }
        }
    }
}
