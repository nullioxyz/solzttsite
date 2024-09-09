<?php

namespace App\Repositories\SiteSetting;

use App\Models\SiteSetting;
use App\Repositories\BaseRepository;

class SiteSettingRepository extends BaseRepository {

    protected $model;

    public function __construct(SiteSetting $model)
    {
        $this->model = $model;
    }
}
