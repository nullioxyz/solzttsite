<?php

namespace App\Repositories\SiteSettingLang;

use App\Models\SiteSettingLang;
use App\Repositories\BaseRepository;

class SiteSettingLangRepository extends BaseRepository {

    protected $model;

    public function __construct(SiteSettingLang $model)
    {
        $this->model = $model;
    }
}
