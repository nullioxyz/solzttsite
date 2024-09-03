<?php

namespace Database\Seeders;

use App\Models\ContentType;
use App\Models\Language;
use App\Models\Portfolio;
use App\Models\PortfolioLang;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class PortfolioTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $languages = Language::get();

        $portfolio1 = Portfolio::create([
            'slug' => 'porfolio-1',
            'category_id' => 1,
            'content_type_id' => ContentType::TATTOO,
            'active' => 1
        ]);

        $portfolio2 = Portfolio::create([
            'slug' => 'porfolio-2',
            'category_id' => 2,
            'content_type_id' => ContentType::TATTOO,
            'active' => 1
        ]);

        $portfolio3 = Portfolio::create([
            'slug' => 'porfolio-3',
            'category_id' => 3,
            'content_type_id' => ContentType::TATTOO,
            'active' => 1
        ]);

        $portfolio4 = Portfolio::create([
            'slug' => 'porfolio-4',
            'category_id' => 1,
            'content_type_id' => ContentType::TATTOO,
            'active' => 1
        ]);

        $portfolio5 = Portfolio::create([
            'slug' => 'porfolio-5',
            'category_id' => 2,
            'content_type_id' => ContentType::TATTOO,
            'active' => 0
        ]);

        foreach ($languages as $lang) {
            if ($lang->slug == 'pt') {
                PortfolioLang::insert(
                    [
                        // 1 
                        [
                            'portfolio_id' => $portfolio1->id,
                            'language_id' => $lang->id,
                            'title' => 'Portfolio 1',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Portfolio 1'),
                        ],
                        // 2
                        [
                            'portfolio_id' => $portfolio2->id,
                            'language_id' => $lang->id,
                            'title' => 'Portfolio 2',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Portfolio 2'),
                        ],

                        [
                            'portfolio_id' => $portfolio3->id,
                            'language_id' => $lang->id,
                            'title' => 'Portfolio 3',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Portfolio 3'),
                        ],

                        [
                            'portfolio_id' => $portfolio4->id,
                            'language_id' => $lang->id,
                            'title' => 'Portfolio 4',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Portfolio 4'),
                        ],

                        [
                            'portfolio_id' => $portfolio5->id,
                            'language_id' => $lang->id,
                            'title' => 'Portfolio 5',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Portfolio 5'),
                        ],
                    ]
                );
            }

            if ($lang->slug == 'it') {
                PortfolioLang::insert(
                    [
                        // 1 
                        [
                            'portfolio_id' => $portfolio1->id,
                            'language_id' => $lang->id,
                            'title' => 'Portfolio 1',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Portfolio 1 it'),
                        ],
                        // 2
                        [
                            'portfolio_id' => $portfolio2->id,
                            'language_id' => $lang->id,
                            'title' => 'Portfolio 2',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Portfolio 2 it'),
                        ],

                        [
                            'portfolio_id' => $portfolio3->id,
                            'language_id' => $lang->id,
                            'title' => 'Portfolio 3',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Portfolio 3 it'),
                        ],

                        [
                            'portfolio_id' => $portfolio4->id,
                            'language_id' => $lang->id,
                            'title' => 'Portfolio 4',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Portfolio 4 it'),
                        ],

                        [
                            'portfolio_id' => $portfolio5->id,
                            'language_id' => $lang->id,
                            'title' => 'Portfolio 5',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Portfolio 5 it'),
                        ],
                    ]
                );
            }

            if ($lang->slug == 'en') {
                PortfolioLang::insert(
                    [
                        // 1 
                        [
                            'portfolio_id' => $portfolio1->id,
                            'language_id' => $lang->id,
                            'title' => 'Portfolio 1',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Portfolio 1 en'),
                        ],
                        // 2
                        [
                            'portfolio_id' => $portfolio2->id,
                            'language_id' => $lang->id,
                            'title' => 'Portfolio 2',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Portfolio 2 en'),
                        ],

                        [
                            'portfolio_id' => $portfolio3->id,
                            'language_id' => $lang->id,
                            'title' => 'Portfolio 3',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Portfolio 3 en'),
                        ],

                        [
                            'portfolio_id' => $portfolio4->id,
                            'language_id' => $lang->id,
                            'title' => 'Portfolio 4',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Portfolio 4 en'),
                        ],

                        [
                            'portfolio_id' => $portfolio5->id,
                            'language_id' => $lang->id,
                            'title' => 'Portfolio 5',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Portfolio 5 en'),
                        ],
                    ]
                );
            }
        }
    }
}
