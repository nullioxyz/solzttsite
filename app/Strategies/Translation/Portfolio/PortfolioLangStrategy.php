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
        $languagesData = array_map(function($lang, $id) use ($institucional) {
            return array_merge($lang, [
                'language_id' => $id,
                'portfolio_id' => $institucional->id,
            ]);
        }, $languages, array_keys($languages));
        
        return $this->portfolioLangRepo->createMany($languagesData);
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