<?php

namespace App\Repositories;

abstract class BaseRepository implements BaseRepositoryInterface {
    
    protected $model;
    protected $query;

    public function __construct($model)
    {
        $this->model = $model;
    }

    public function getAll()
    {
        return $this->model->get();
    }

    public function paginate($perPage = 20)
    {
        return $this->model->paginate($perPage);
    }

    public function with(array $relations)
    {
        $this->model = $this->model->with($relations);
        
        return $this;
    }

    public function get($id)
    {
        return $this->model->find($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function createMany(array $data)
    {
        return $this->model->insert($data);
    }

    public function where($field, $operator, $value)
    {
        $this->model = $this->model->where($field, $operator, $value);

        return $this;
    }

    public function whereIn($field, array $data)
    {
        $this->model = $this->model->whereIn($field, $data);

        return $this;
    }

    public function update($id, array $data)
    {
        return $this->model->where('id', $id)->update($data);
    }

    public function destroy($id)
    {
        return $this->model->destroy($id);
    }

    public function model()
    {
        return $this->model;
    }
}
