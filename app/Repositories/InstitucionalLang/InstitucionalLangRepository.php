<?php

namespace App\Repositories\InstitucionalLang;

use App\Models\InstitucionalLang;
use App\Repositories\BaseRepository;

class InstitucionalLangRepository extends BaseRepository {

    protected $model;

    public function __construct(InstitucionalLang $model)
    {
        $this->model = $model;
    }
}
