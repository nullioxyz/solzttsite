<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

class SiteSetting extends Model
{
    use HasFactory;
    
    protected $table = 'site_setting';

    protected $fillable = [
        'slug',
        'theme_id'
    ];

    public $timestamps = false;

    public function langs(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(SiteSettingLang::class, 'site_setting_id');
    }

    public function theme()
    {
        return $this->belongsTo(Theme::class, 'theme_id');
    }

    public function defaultTranslation()
    {
        return $this->hasOne(SiteSettingLang::class, 'site_setting_id')
            ->whereHas('language', function ($query) {
                $query->where('default', true);
            });
    }

    public function translation()
    {
        $locale = App::getLocale();

        return $this->hasOne(SiteSettingLang::class, 'site_setting_id')
            ->whereHas('language', function ($query) use ($locale) {
                $query->where('slug', $locale);
            });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
