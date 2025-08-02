<?php

namespace App\Models;

use App\Traits\SlugModelSettings;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Spatie\Sluggable\HasSlug;

class PortfolioLang extends Model
{
    use HasSlug, SlugModelSettings;

    protected $table = 'portfolio_lang';

    protected $fillable = [
        'portfolio_id',
        'language_id',
        'title',
        'description',
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
                'field' => 'slug',
                'label' => __('Slug'),
            ]
        ]);
    }

    public static function translationFieldValues($institucionalLangs)
    {
        $fields = [];
        
        foreach($institucionalLangs as $lang) {
            $fields[$lang->id]['title'] = $lang->title;
            $fields[$lang->id]['description'] = $lang->description;
            $fields[$lang->id]['slug'] = $lang->slug;
        }

        return $fields;
    }

}
