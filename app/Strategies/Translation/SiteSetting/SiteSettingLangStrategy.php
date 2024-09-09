<?php

namespace App\Strategies\Translation\SiteSetting;

use App\Repositories\SiteSettingLang\SiteSettingLangRepository;
use App\Strategies\Interfaces\TranslationStrategyInterface;


class SiteSettingLangStrategy implements TranslationStrategyInterface {
    
    protected $siteSettingRepo;

    public function __construct(SiteSettingLangRepository $siteSettingRepo)
    {
        $this->siteSettingRepo = $siteSettingRepo;    
    }

    public function create(array $languages, $siteSetting)
    {
        $languagesData = array_map(function($lang, $id) use ($siteSetting) {
            return array_merge($lang, [
                'language_id' => $id,
                'site_setting_id' => $siteSetting->id,
            ]);
        }, $languages, array_keys($languages));
        
        return $this->siteSettingRepo->createMany($languagesData);
    }

    public function update(array $languages, $siteSettingLangId)
    {
        return $this->siteSettingRepo->update($siteSettingLangId, $languages);
    }

    public function decideCreateOrUpdate(array $languages, $siteSetting)
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
                    $siteSetting
                );
            } else {
                $this->update(
                    [
                        'title' => $lang['title'],
                        'description' => $lang['description'],
                        'slug' => $lang['slug'],
                        'keywords' => $lang['keywords']
                    ],
                    $lang['id']
                );
            }
        }
    }

    public function destroy($id)
    {
        return $this->siteSettingRepo->destroy($id);
    }
}