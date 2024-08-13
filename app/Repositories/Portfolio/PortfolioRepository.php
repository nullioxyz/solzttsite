<?php

namespace App\Repositories\Portfolio;

use App\Models\Portfolio;
use App\Repositories\BaseRepository;

class PortfolioRepository extends BaseRepository
{
    protected $model;

    public function __construct(Portfolio $model)
    {
        $this->model = $model;
    }
}
