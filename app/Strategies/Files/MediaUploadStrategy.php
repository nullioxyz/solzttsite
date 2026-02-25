<?php

namespace App\Strategies\Files;

use App\Jobs\UploadMediaJob;
use App\Models\Media;
use App\Strategies\Interfaces\FileUploadStrategyInterface;
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
        return $model->media()->where('id', (int) $fileId)->first();
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
        if (!$media instanceof Media) {
            throw new \InvalidArgumentException('Media not found for this record.');
        }

        // Spatie MediaLibrary already handles deleting original + conversions.
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
