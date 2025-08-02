<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class InstitucionalLang extends Model
{
    use HasSlug;
    
    protected $table = 'institucional_lang';

    protected $fillable = [
        'institucional_id',
        'language_id',
        'title',
        'description',
        'slug'
    ];

    public $timestamps = false;

    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }   

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

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
