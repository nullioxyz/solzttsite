<?php

namespace App\Strategies\Files;

use App\Jobs\DeleteMediaJob;
use App\Jobs\UploadMediaJob;
use App\Models\Media;
use App\Strategies\Interfaces\FileUploadStrategyInterface;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
            ->toMediaCollection($collection, 'local');
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
        DeleteMediaJob::dispatch(
            [
                'disk' => $media->disk,
                'id' => $media->id,
                'file_name' => $media->file_name,
            ]
        );

        $media->delete();
    }

    public function uploadAsync(array $files, $model, string $collection)
    {
        if (! $model instanceof \Spatie\MediaLibrary\HasMedia) {
            throw new \InvalidArgumentException('Model must implement Spatie\MediaLibrary\HasMedia');
        }

        foreach ($files as $file) {
            $folder = Str::uuid()->toString();
            $filename = $file->getClientOriginalName();

            $tempPath = $file->storeAs("temp_uploads/{$folder}", $filename, 'public');

            UploadMediaJob::dispatch($model, $tempPath, $file->getClientMimeType(), $collection);
        }

        return $model;
    }
}