<?php

namespace Database\Seeders;

use App\Models\ContentType;
use App\Models\Institucional;
use App\Models\InstitucionalLang;
use App\Models\Language;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class InstitucionalTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $solzttUniverse = [
            'slug' => 'solztt-universe',
            'content_type_id' => ContentType::TATTOO
        ];

        $institucionalSolzttUniverse = Institucional::create($solzttUniverse);


        $appointment1 = Institucional::create([
            'slug' => 'appointment-1',
            'content_type_id' => ContentType::TATTOO
        ]);

        $appointment2 = Institucional::create([
            'slug' => 'appointment-2',
            'content_type_id' => ContentType::TATTOO
        ]);

        $appointment3 = Institucional::create([
            'slug' => 'appointment-3',
            'content_type_id' => ContentType::TATTOO
        ]);

        $tattooBookText = Institucional::create([
            'slug' => 'tattoo-book-text',
            'content_type_id' => ContentType::TATTOO
        ]);

        $creativeProcess = Institucional::create([
            'slug' => 'criative-process',
            'content_type_id' => ContentType::TATTOO
        ]);

        $consideration = Institucional::create([
            'slug' => 'consideration',
            'content_type_id' => ContentType::TATTOO
        ]);

        $paymentMethods = Institucional::create([
            'slug' => 'payment-methods',
            'content_type_id' => ContentType::TATTOO
        ]);

        $warning = Institucional::create([
            'slug' => 'warning',
            'content_type_id' => ContentType::TATTOO
        ]);

        $languages = Language::get();

        foreach ($languages as $lang) {
            if ($lang->slug == 'pt') {
                InstitucionalLang::insert(
                    [
                        //solzttuniverse
                        [
                            'institucional_id' => $institucionalSolzttUniverse->id,
                            'language_id' => $lang->id,
                            'title' => 'O Universo Solztt',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('O Universo Solztt'),
                        ],
                        //how to session
                        [
                            'institucional_id' => $appointment1->id,
                            'language_id' => $lang->id,
                            'title' => 'Clique no botão abaixo',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Clique no botão abaixo'),
                        ],

                        [
                            'institucional_id' => $appointment2->id,
                            'language_id' => $lang->id,
                            'title' => 'Preencha o formulário',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Preencha o formulário'),
                        ],

                        [
                            'institucional_id' => $appointment3->id,
                            'language_id' => $lang->id,
                            'title' => 'Agendamento',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Agendamento'),
                        ],
                        [
                            'institucional_id' => $warning->id,
                            'language_id' => $lang->id,
                            'title' => 'Atenção',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Atenção'),
                        ],

                        //contact session
                        [
                            'institucional_id' => $tattooBookText->id,
                            'language_id' => $lang->id,
                            'title' => 'Texto 1 contato',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Texto 1 contato'),
                        ],
                        [
                            'institucional_id' => $creativeProcess->id,
                            'language_id' => $lang->id,
                            'title' => 'Texto 2 contato',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Texto 2 contato'),
                        ],
                        [
                            'institucional_id' => $consideration->id,
                            'language_id' => $lang->id,
                            'title' => 'Texto 3 contato',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Texto 3 contato'),
                        ],
                        [
                            'institucional_id' => $paymentMethods->id,
                            'language_id' => $lang->id,
                            'title' => 'Texto 4 contato',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Texto 4 contato'),
                        ],
                    ]
                );
            }

            if ($lang->slug == 'it') {
                InstitucionalLang::insert(
                    [
                        //solzttuniverse
                        [
                            'institucional_id' => $institucionalSolzttUniverse->id,
                            'language_id' => $lang->id,
                            'title' => "L'Universo Solztt",
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Luniverso Solztt'),
                        ],
                        //how to session
                        [
                            'institucional_id' => $appointment1->id,
                            'language_id' => $lang->id,
                            'title' => "Fare clic sul pulsante qui sotto",
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Fare clic sul pulsante qui sotto'),
                        ],
                        [
                            'institucional_id' => $appointment2->id,
                            'language_id' => $lang->id,
                            'title' => "Compila il modulo",
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Compila il modulo'),
                        ],
                        [
                            'institucional_id' => $appointment3->id,
                            'language_id' => $lang->id,
                            'title' => "Pianificazione",
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('pianificazione'),
                        ],
                        [
                            'institucional_id' => $warning->id,
                            'language_id' => $lang->id,
                            'title' => 'Attenzione',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Attenzione'),
                        ],
                        //contact session
                        [
                            'institucional_id' => $tattooBookText->id,
                            'language_id' => $lang->id,
                            'title' => 'Testo 1 contato',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Testo 1 contato'),
                        ],
                        [
                            'institucional_id' => $creativeProcess->id,
                            'language_id' => $lang->id,
                            'title' => 'Testo 2 contato',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Testo 2 contato'),
                        ],
                        [
                            'institucional_id' => $consideration->id,
                            'language_id' => $lang->id,
                            'title' => 'Testo 3 contato',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Testo 3 contato'),
                        ],
                        [
                            'institucional_id' => $paymentMethods->id,
                            'language_id' => $lang->id,
                            'title' => 'Testo 4 contato',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Testo 4 contato'),
                        ],
                    ]

                );
            }

            if ($lang->slug == 'en') {
                InstitucionalLang::insert(
                    [
                        //solztt universe
                        [
                            'institucional_id' => $institucionalSolzttUniverse->id,
                            'language_id' => $lang->id,
                            'title' => "Solztt Universe",
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Solztt universe'),
                        ],

                        //how to session
                        [
                            'institucional_id' => $appointment1->id,
                            'language_id' => $lang->id,
                            'title' => "Click the button below",
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Click the button below'),
                        ],
                        [
                            'institucional_id' => $appointment2->id,
                            'language_id' => $lang->id,
                            'title' => "Fill out the form",
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Fill out the form'),
                        ],
                        [
                            'institucional_id' => $appointment3->id,
                            'language_id' => $lang->id,
                            'title' => "Book",
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Book'),
                        ],
                        [
                            'institucional_id' => $warning->id,
                            'language_id' => $lang->id,
                            'title' => 'Warning',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Warning'),
                        ],
                        //contact session
                        [
                            'institucional_id' => $tattooBookText->id,
                            'language_id' => $lang->id,
                            'title' => 'Text 1 contact',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Text 1 contact'),
                        ],
                        [
                            'institucional_id' => $creativeProcess->id,
                            'language_id' => $lang->id,
                            'title' => 'Text 2 contact',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Text 2 contact'),
                        ],
                        [
                            'institucional_id' => $consideration->id,
                            'language_id' => $lang->id,
                            'title' => 'Text 3 contact',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Text 3 contact'),
                        ],
                        [
                            'institucional_id' => $paymentMethods->id,
                            'language_id' => $lang->id,
                            'title' => 'Text 4 contact',
                            'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                            'slug' => Str::slug('Text 4 contact'),
                        ],
                    ]
                );
            }
        }
    }
}
