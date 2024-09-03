<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\CategoryLang;
use App\Models\ContentType;
use App\Models\Language;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $languages = Language::get();

        $category1 = Category::create([
            'content_type_id' => ContentType::TATTOO,
            'slug' => 'category-1',
            'active' => 1
        ]);

        $category2 = Category::create([
            'content_type_id' => ContentType::TATTOO,
            'slug' => 'category-2',
            'active' => 1
        ]);

        $category3 = Category::create([
            'content_type_id' => ContentType::TATTOO,
            'slug' => 'category-3',
            'active' => 1
        ]);

        foreach ($languages as $lang) {

            if ($lang->slug == 'pt') {
                CategoryLang::insert(
                    [
                        [
                            'category_id' => $category1->id,
                            'language_id' => $lang->id,
                            'title' => 'Categoria 1',
                            'slug' => Str::slug('Categoria 1')
                        ],
                        [
                            'category_id' => $category2->id,
                            'language_id' => $lang->id,
                            'title' => 'Categoria 2',
                            'slug' => Str::slug('Categoria 2')
                        ],
                        [
                            'category_id' => $category3->id,
                            'language_id' => $lang->id,
                            'title' => 'Categoria 3',
                            'slug' => Str::slug('Categoria 3')
                        ]
                    ]
                );
            }


            if ($lang->slug == 'it') {
                CategoryLang::insert(
                    [
                        [
                            'category_id' => $category1->id,
                            'language_id' => $lang->id,
                            'title' => 'Categoria 1',
                            'slug' => Str::slug('Categoria 1 it')
                        ],
                        [
                            'category_id' => $category2->id,
                            'language_id' => $lang->id,
                            'title' => 'Categoria 2',
                            'slug' => Str::slug('Categoria 2 it')
                        ],
                        [
                            'category_id' => $category2->id,
                            'language_id' => $lang->id,
                            'title' => 'Categoria 3',
                            'slug' => Str::slug('Categoria 3 it')
                        ]
                    ]
                );
            }


            if ($lang->slug == 'en') {
                CategoryLang::insert(
                    [
                        [
                            'category_id' => $category1->id,
                            'language_id' => $lang->id,
                            'title' => 'Category 1',
                            'slug' => Str::slug('Category 1 en')
                        ],
                        [
                            'category_id' => $category2->id,
                            'language_id' => $lang->id,
                            'title' => 'Category 2',
                            'slug' => Str::slug('Category 2 en')
                        ],
                        [
                            'category_id' => $category3->id,
                            'language_id' => $lang->id,
                            'title' => 'Category 3',
                            'slug' => Str::slug('Category 3 en')
                        ]
                    ]
                );
            }
        }
    }
}
