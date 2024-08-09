<?php

namespace App\Repositories\Institucional;

use App\Models\Institucional;
use App\Repositories\BaseRepository;

class InstitucionalRepository extends BaseRepository
{
    protected $model;

    public function __construct(Institucional $model)
    {
        $this->model = $model;
    }
}
