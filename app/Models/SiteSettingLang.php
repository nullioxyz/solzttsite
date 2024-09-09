<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Collection;

class SiteSettingLang extends Model
{
    use HasFactory;
    
    protected $table = 'site_setting_lang';

    protected $fillable = [
        'site_setting_id',
        'language_id',
        'title',
        'description',
        'keywords',
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

}
