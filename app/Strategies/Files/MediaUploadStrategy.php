<?php

namespace App\Strategies\Files;

use App\Strategies\Interfaces\FileUploadStrategyInterface;
use Illuminate\Support\Facades\Storage;

class MediaUploadStrategy implements FileUploadStrategyInterface
{
    public function upload(array $files, $model, $collection)
    {
        $modelInstance = $model;

        if (! $modelInstance instanceof \Spatie\MediaLibrary\HasMedia) {
            throw new \InvalidArgumentException('Model must implement Spatie\MediaLibrary\HasMedia');
        }

        foreach($files as $file) {
            $modelInstance->addMedia($file)
                ->toMediaCollection($collection);
        }

        return $model;
    }

    public function getMediaById($fileId, $model)
    {
        return $model->media()->where('id', $fileId)->first();
    }

    public function delete($media)
    {
        $media->delete();
    }
}