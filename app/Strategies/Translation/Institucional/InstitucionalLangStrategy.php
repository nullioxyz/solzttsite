<?php

namespace App\Strategies\Translation\Institucional;

use App\Repositories\InstitucionalLang\InstitucionalLangRepository;
use App\Strategies\Interfaces\TranslationStrategyInterface;


class InstitucionalLangStrategy implements TranslationStrategyInterface {
    
    protected $institucionalLangRepo;

    public function __construct(InstitucionalLangRepository $institucionalLangRepo)
    {
        $this->institucionalLangRepo = $institucionalLangRepo;    
    }

    public function create(array $languages, $institucional)
    {
        $created = [];

        foreach ($languages as $languageId => $langData) {
            $data = array_merge($langData, [
                'language_id' => $languageId,
                'institucional_id' => $institucional->id,
            ]);

            $created[] = $this->institucionalLangRepo->create($data);
        }

        return $created;
    }

    public function update(array $languages, $institucionalLangId)
    {
        return $this->institucionalLangRepo->update($institucionalLangId, $languages);
    }

    public function decideCreateOrUpdate(array $languages, $institucional)
    {
        foreach($languages as $id => $lang) {
            if (!isset($lang['id']) || is_null($lang['id'])) {
                $this->create(
                    [
                        $id => [
                        ...$lang,
                        'language_id' => $id
                        ]
                    ],
                    $institucional
                );
            } else {
                $this->update(
                    [
                        'title' => $lang['title'],
                        'description' => $lang['description']
                    ],
                    $lang['id']
                );
            }
        }
    }

    public function destroy($id)
    {
        return $this->institucionalLangRepo->destroy($id);
    }
}