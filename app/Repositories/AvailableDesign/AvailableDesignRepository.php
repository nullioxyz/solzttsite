<?php

namespace App\Repositories\AvailableDesign;

use App\Models\AvailableDesign;
use App\Repositories\BaseRepository;

class AvailableDesignRepository extends BaseRepository
{
    protected $model;

    public function __construct(AvailableDesign $model)
    {
        $this->model = $model;
    }
}
