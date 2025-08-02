<?php

namespace App\Strategies\Translation\Category;

use App\Repositories\CategoryLang\CategoryLangRepository;
use App\Strategies\Interfaces\TranslationStrategyInterface;

class CategoryLangStrategy implements TranslationStrategyInterface {
    
    protected $categoryLangRepo;

    public function __construct(CategoryLangRepository $categoryLangRepo)
    {
        $this->categoryLangRepo = $categoryLangRepo;    
    }

    public function create(array $languages, $category)
    {
        $created = [];

        foreach ($languages as $languageId => $langData) {
            $data = array_merge($langData, [
                'language_id' => $languageId,
                'category_id' => $category->id,
            ]);

            $created[] = $this->categoryLangRepo->create($data);
        }

        return $created;
    }

    public function update(array $languages, $categoryLangId)
    {
        return $this->categoryLangRepo->update($categoryLangId, $languages);
    }

    public function decideCreateOrUpdate(array $languages, $category)
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
                    $category
                );
            } else {
                $this->update(
                    [
                        'title' => $lang['title'],
                    ],
                    $lang['id']
                );
            }
        }
    }

    public function destroy($id)
    {
        return $this->categoryLangRepo->destroy($id);
    }
}