<?php

namespace App\Strategies\Interfaces;

interface FileUploadStrategyInterface {
    public function upload(array $files, $model, $collection);
    public function delete($media);
}