<?php

namespace App\Repositories;

use App\Models\Institucional;

class InstitucionalRepository
{
    protected $model;

    public function __construct(Institucional $model)
    {
        $this->model = $model;
    }

    public function paginate()
    {
        return $this->model->with('contentType')->paginate();
    }

    public function create($request)
    {
        return $this->model->create($request->all());
    }

    public function update(Institucional $institucional, $data)
    {
        return $institucional->update($data);
    }

    public function find(Institucional $institucional)
    {
        
    }

    public function destroy(Institucional $institucional)
    {
        return $institucional->delete();
    }
}
