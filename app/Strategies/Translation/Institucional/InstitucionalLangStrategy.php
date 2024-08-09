<?php

namespace App\Strategies\Translation\Institucional;

use App\Models\Institucional;
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
        $languagesData = array_map(function($lang, $id) use ($institucional) {
            return array_merge($lang, [
                'language_id' => $id,
                'institucional_id' => $institucional->id,
            ]);
        }, $languages, array_keys($languages));
        
        return $this->institucionalLangRepo->createMany($languagesData);
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
                        'slug' => $lang['slug'],
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