<?php

namespace App\Strategies\Translation\Portfolio;

use App\Repositories\PortfolioLang\PortfolioLangRepository;
use App\Strategies\Interfaces\TranslationStrategyInterface;


class PortfolioLangStrategy implements TranslationStrategyInterface {
    
    protected $portfolioLangRepo;

    public function __construct(PortfolioLangRepository $portfolioLangRepo)
    {
        $this->portfolioLangRepo = $portfolioLangRepo;    
    }

    public function create(array $languages, $institucional)
    {
        $created = [];
    
        foreach ($languages as $languageId => $langData) {
            $data = array_merge($langData, [
                'language_id' => $languageId,
                'portfolio_id' => $institucional->id,
            ]);
    
            $created[] = $this->portfolioLangRepo->create($data);
        }
    
        return $created;
    }

    public function update(array $languages, $institucionalLangId)
    {
        return $this->portfolioLangRepo->update($institucionalLangId, $languages);
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
        return $this->portfolioLangRepo->destroy($id);
    }
}