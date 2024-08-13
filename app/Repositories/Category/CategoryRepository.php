<?php

namespace App\Repositories\Category;

use App\Models\Category;
use App\Repositories\BaseRepository;

class CategoryRepository extends BaseRepository
{
    protected $model;

    public function __construct(Category $model)
    {
        $this->model = $model;
    }

    public function toSelectCategories(): array
    {
        $categories = [];
        foreach ($this->getAll() as $category) {
            $categories[] = [
                'label' => $category->defaultTranslation->title,
                'value' => $category->id
            ];
        }

        return $categories;
    }
}
