<?php

namespace App\Models;

use App\Traits\SlugModelSettings;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Collection;
use Spatie\Sluggable\HasSlug;

class SiteSettingLang extends Model
{
    use HasFactory, HasSlug, SlugModelSettings;
    
    protected $table = 'site_setting_lang';

    protected $fillable = [
        'site_setting_id',
        'language_id',
        'title',
        'description',
        'keywords',
        'slug'
    ];

    protected $slugFields = [
        'title'
    ];

    public $timestamps = false;


    public function language()
    {
        return $this->belongsTo(Language::class, 'language_id');
    }

    public static function translationFields(): Collection
    {
        return collect([
            [
                'field' => 'title',
                'label' => __('Title'),
            ],
            [
                'field' => 'description',
                'label' => __('description'),
            ],
            [
                'field' => 'keywords',
                'label' => __('Keywords'),
            ],
            [
                'field' => 'slug',
                'label' => __('Slug'),
            ]
        ]);
    }

    public static function translationFieldValues($siteSettingLangs): array
    {
        $fields = [];

        foreach ($siteSettingLangs as $lang) {
            $fields[$lang->language_id]['title'] = $lang->title;
            $fields[$lang->language_id]['description'] = $lang->description;
            $fields[$lang->language_id]['keywords'] = $lang->keywords;
            $fields[$lang->language_id]['slug'] = $lang->slug;
        }

        return $fields;
    }

}
