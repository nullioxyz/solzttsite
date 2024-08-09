<?php

namespace App\Repositories;

interface BaseRepositoryInterface {
    public function paginate($perPage = 20);
    public function get($id);
    public function create(array $data);
    public function createMany(array $data);
    public function where($field, $operator, $value);
    public function update($model, array $data);
    public function destroy($model);
    public function model();
}