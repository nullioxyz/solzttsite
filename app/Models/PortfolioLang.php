<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class PortfolioLang extends Model
{
    
    protected $table = 'portfolio_lang';

    protected $fillable = [
        'portfolio_id',
        'language_id',
        'title',
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
                'label' => __('Title'),
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
            $fields[$lang->id]['slug'] = $lang->slug;
        }

        return $fields;
    }

}
