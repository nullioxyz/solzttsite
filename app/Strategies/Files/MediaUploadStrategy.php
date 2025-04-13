<?php

namespace App\Strategies\Files;

use App\Models\Media;
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
            ->toMediaCollection($collection, config('filesystems.default'));
        }

        return $model;
    }

    public function getMediaById($fileId, $model)
    {
        return $model->media()->where('id', $fileId)->first();
    }

    public function sortMedia(array $media)
    {
        if (empty($media)) {
            return;
        }

        foreach ($media as $item) {
            $mediaItem = Media::find($item['id']);
            
            if ($mediaItem) {
                
                $mediaItem->update([
                    'order_column' => (int)$item['order_column']
                ]);
            }
        }
    }

    public function delete($media)
    {
        $media->delete();
    }
}