<?php

namespace App\Repositories\CategoryLang;

use App\Models\CategoryLang;
use App\Repositories\BaseRepository;

class CategoryLangRepository extends BaseRepository {

    protected $model;

    public function __construct(CategoryLang $model)
    {
        $this->model = $model;
    }
}
