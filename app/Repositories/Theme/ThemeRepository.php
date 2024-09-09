<?php

namespace App\Repositories\Theme;

use App\Models\Theme;
use App\Repositories\BaseRepository;

class ThemeRepository extends BaseRepository
{
    protected $model;

    public function __construct(Theme $model)
    {
        $this->model = $model;
    }

    public function toSelectTheme(): array
    {
        $themes = [];
        foreach ($this->getAll() as $theme) {
            $themes[] = [
                'label' => $theme->title,
                'value' => $theme->id
            ];
        }

        return $themes;
    }
}
