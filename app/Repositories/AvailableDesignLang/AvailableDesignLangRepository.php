<?php

namespace App\Repositories\AvailableDesignLang;

use App\Models\AvailableDesignLang;
use App\Repositories\BaseRepository;

class AvailableDesignLangRepository extends BaseRepository
{
    protected $model;

    public function __construct(AvailableDesignLang $model)
    {
        $this->model = $model;
    }
}
