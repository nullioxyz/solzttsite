<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\CategoryLang;
use App\Models\ContentType;
use App\Models\Language;
use App\Models\SiteSetting;
use App\Models\SiteSettingLang;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class SiteSettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $languages = Language::get();

        $setting = SiteSetting::create([
            'slug' => 'default-conf',
            'theme_id' => 1
        ]);

        foreach ($languages as $lang) {

            if ($lang->slug == 'pt') {
                SiteSettingLang::insert(
                    [
                        [
                            'site_setting_id' => $setting->id,
                            'language_id' => $lang->id,
                            'title' => 'Solztt - Artista Tatuadora',
                            'description' => 'Solztt - Artista Tatuadora',
                            'keywords' => 'tatuagem, abstrato, figurativo, arte comtemporânea',
                            'slug' => 'artista-tatuadora'
                        ],
                    ]
                );
            }


            if ($lang->slug == 'it') {
                SiteSettingLang::insert(
                    [
                        [
                            'site_setting_id' => $setting->id,
                            'language_id' => $lang->id,
                            'title' => 'Solztt - Tattoo Artist',
                            'description' => 'Solztt - Tattoo Artist',
                            'keywords' => 'tatuaggio, astratto, figurativo, arte contemporanea',
                            'slug' => 'solztt-tattoo-artist-it'
                        ],
                    ]
                );
            }


            if ($lang->slug == 'en') {
                SiteSettingLang::insert(
                    [
                        [
                            'site_setting_id' => $setting->id,
                            'language_id' => $lang->id,
                            'title' => 'Solztt - Tattoo Artist',
                            'description' => 'Solztt - Tattoo Artist',
                            'keywords' => 'Tattoo, abstract, figurative, contemporary art',
                            'slug' => 'solztt-tattoo-artist-eng'
                        ]
                    ]
                );
            }
        }
    }
}
