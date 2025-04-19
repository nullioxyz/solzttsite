<?php

namespace App\Strategies\Translation\AvailableDesign;

use App\Repositories\AvailableDesignLang\AvailableDesignLangRepository;
use App\Strategies\Interfaces\TranslationStrategyInterface;
use Illuminate\Support\Str;


class AvailableDesignLangStrategy implements TranslationStrategyInterface {
    
    protected $availableDesignLangRepo;

    public function __construct(AvailableDesignLangRepository $availableDesignLangRepo)
    {
        $this->availableDesignLangRepo = $availableDesignLangRepo;    
    }

    public function create(array $languages, $availableDesign)
    {
        $languagesData = array_map(function($lang, $id) use ($availableDesign) {
            return array_merge($lang, [
                'language_id' => $id,
                'available_design_id' => $availableDesign->id,
                'slug' =>  Str::slug($lang['title'] . '-' . $id),
            ]);
        }, $languages, array_keys($languages));
        
        return $this->availableDesignLangRepo->createMany($languagesData);
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
                        'slug' =>  Str::slug($lang['title'] . '-' . $id),
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