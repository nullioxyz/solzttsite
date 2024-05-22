<?php

namespace App\Repositories;

use App\Models\ContentType;

class ContentTypeRepository
{
    protected $model;

    public function __construct(ContentType $model)
    {
        $this->model = $model;
    }

    public function get()
    {
        return $this->model->get();
    }

    public function paginate()
    {
        return $this->model->paginate();
    }

    public function create($request)
    {
        return $this->model->create($request->all());
    }

    public function update(ContentType $contentType, $data)
    {
        return $contentType->update($data);
    }

    public function destroy(ContentType $contentType)
    {
        return $contentType->delete();
    }
}
