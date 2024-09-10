<?php

namespace App\Repositories\Social;

use App\Models\Social;
use App\Repositories\BaseRepository;

class SocialRepository extends BaseRepository
{
    protected $model;

    public function __construct(Social $model)
    {
        $this->model = $model;
    }
}
