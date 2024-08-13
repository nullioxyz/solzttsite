<?php

namespace App\Repositories\PortfolioLang;

use App\Models\PortfolioLang;
use App\Repositories\BaseRepository;

class PortfolioLangRepository extends BaseRepository {

    protected $model;

    public function __construct(PortfolioLang $model)
    {
        $this->model = $model;
    }
}
