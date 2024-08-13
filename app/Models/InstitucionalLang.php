<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class InstitucionalLang extends Model
{
    protected $table = 'institucional_lang';

    protected $fillable = [
        'institucional_id',
        'language_id',
        'title',
        'description',
        'slug'
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
                'label' => __('Label'),
            ],
            [
                'field'  => 'description',
                'label' => __('Description'),
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
