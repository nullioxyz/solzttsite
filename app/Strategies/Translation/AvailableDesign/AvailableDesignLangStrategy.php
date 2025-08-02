<?php

namespace App\Strategies\Translation\AvailableDesign;

use App\Repositories\AvailableDesignLang\AvailableDesignLangRepository;
use App\Strategies\Interfaces\TranslationStrategyInterface;


class AvailableDesignLangStrategy implements TranslationStrategyInterface {
    
    protected $availableDesignLangRepo;

    public function __construct(AvailableDesignLangRepository $availableDesignLangRepo)
    {
        $this->availableDesignLangRepo = $availableDesignLangRepo;    
    }

    public function create(array $languages, $availableDesign)
    {
        $created = [];

        foreach ($languages as $languageId => $langData) {
            $data = array_merge($langData, [
                'language_id' => $languageId,
                'available_design_id' => $availableDesign->id,
            ]);

            $created[] = $this->availableDesignLangRepo->create($data);
        }

        return $created;
    }

    public function update(array $languages, $availableDesignLangId)
    {
        return $this->availableDesignLangRepo->update($availableDesignLangId, $languages);
    }

    public function decideCreateOrUpdate(array $languages, $availableDesign)
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
                    $availableDesign
                );
            } else {
                $this->update(
                    [
                        'title' => $lang['title'],
                        'description' => $lang['description'],
                        'slug' => $lang['slug'],
                    ],
                    $lang['id']
                );
            }
        }
    }

    public function destroy($id)
    {
        return $this->availableDesignLangRepo->destroy($id);
    }
}